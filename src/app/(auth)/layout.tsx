import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* LEFT — Visual */}
      <div className="hidden md:block md:w-1/2 flex-none relative">
        <Image
          src="/Joy_Juncture.webp"
          alt="Joy Juncture "
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT — Content Area */}
      <div
        className="w-full md:w-1/2 flex-none flex items-center justify-center px-6"
        style={{ backgroundColor: "#F4C752" }}
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
