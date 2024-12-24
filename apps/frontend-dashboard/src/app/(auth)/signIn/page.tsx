import Logo from "@/images/lomnov-logo.png";
import Image from "next/image";

import LoginForm from "@/components/molecules/auth/login-form/LoginForm";



const page = () => {
  return (
    <div className="w-full h-screen flex">
      {/* Left side of the page (login form) */}
      <div className="w-[500px] h-screen bg-slate-50">
        <div className="w-[500px] h-full bg-Bg p-[32px]">
          <div className="mb-[200px]">
            {/* Logo */}
            <Image src={Logo} alt="logo" width={129} height={43.13} />
          </div>
          <div className="w-full">
            {/* Login Form Heading */}
            <p className="text-[24px] font-black mb-[15px] text-BlackSecondary">Login</p>
            {/* Login form */}
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right side gradient background */}
      <div className="w-full h-screen bg-gradient-to-b from-[#7D7757] border-l-2"></div>
    </div>
  );
};

export default page;
