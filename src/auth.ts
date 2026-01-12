import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import { getUserById } from "@/data/user"
import { UserRole } from "./generated/prisma"
import bcrypt from "bcrypt"
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { checkRateLimit } from "@/lib/rate-limit";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (user.id) {
        const existingUser = await getUserById(user.id);
        // Block if not verified
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return null;

      token.role = existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(db as any) as any,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours (default is 30 days)
    updateAge: 60 * 60, // 1 hour (rotate session timestamp every hour)
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          let user = await db.user.findFirst({
            where: {
              OR: [
                { email: email },
                { phoneNumber: email }
              ]
            }
          });

          // If not found, try to parse as phone number (assuming IN default if missing country code)
          if (!user) {
            const phoneNumber = parsePhoneNumberFromString(email, 'IN');
            if (phoneNumber) {
              const formatted = phoneNumber.number; // E.164 format
              user = await db.user.findUnique({
                where: { phoneNumber: formatted }
              });
            }
          }

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user as any;
        }

        return null;
      }
    })
  ]
})