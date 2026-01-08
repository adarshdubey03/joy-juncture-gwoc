import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT — Visual */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/joy-juncture-team.jpg"
          alt="Joy Juncture Team"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT — Login */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center px-6"
        style={{ backgroundColor: "#F4C752" }}
      >
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-fredoka text-3xl text-black">
              Belong to the joy.
            </h1>
            <p className="mt-2 text-sm text-black/70 font-geist">
              Sign in to keep your moments, points, and play history together.
            </p>
          </div>

          {/* Manual Login */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg px-4 py-3 text-sm bg-white border border-black/20 outline-none focus:border-black focus:ring-0"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg px-4 py-3 text-sm bg-white border border-black/20 outline-none focus:border-black focus:ring-0"
            />

            <button
              className="w-full rounded-lg py-3 text-sm font-medium bg-black text-white transition hover:bg-black/90 cursor-pointer"
            >
              Continue
            </button>
          </div>

          {/* OR Separator */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-black/20" />
            <span className="px-3 text-xs text-black/60 font-geist">
              OR
            </span>
            <div className="flex-1 h-px bg-black/20" />
          </div>

          {/* Google Login */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 font-medium transition hover:bg-white/90 cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.01 6.22C12.43 13.4 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.63-.15-3.2-.43-4.72H24v9.02h12.4c-.53 2.9-2.18 5.36-4.62 7.04l7.05 5.48C42.96 37.36 46.1 31.4 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.57 28.44c-.48-1.45-.76-2.99-.76-4.44s.27-2.99.76-4.44l-8.01-6.22C.92 16.06 0 19.95 0 24c0 4.05.92 7.94 2.56 11.22l8.01-6.78z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.05-5.48c-1.96 1.32-4.48 2.1-8.85 2.1-6.26 0-11.57-3.9-13.43-9.44l-8.01 6.78C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Trust line */}
          <p className="mt-8 text-xs text-black/60 font-geist">
            We don’t spam. We don’t rush. You’re in control.
          </p>
        </div>
      </div>
    </div>
  );
}
