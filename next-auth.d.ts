import { UserRole } from "@/generated/prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole;
            id: string;
        } & DefaultSession["user"];
    }

    interface User {
        role: UserRole;
    }
}