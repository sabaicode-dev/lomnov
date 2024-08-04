import React from "react";
import LoginForm from "../../../../components/organisms/auth/form-login/LoginForm";
import { Facebook, Google } from "@/icons";
import Image from "next/image";
import image from "@/images/Login_logo.png";
import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import banner from "@/images/banner.png";

const SignInPage = () => {
  return (
    // <main>
    //   <Header />
    //   <div
    //     className="container mx-auto p-4 md:py-20"
    //     style={{ maxWidth: "1300px" }}
    //   >
    //     <div className="flex flex-col sm:flex-row gap-8 md:gap-32 justify-center items-center mb-10">
    //       <Image
    //         src={image}
    //         alt="Login logo"
    //         width={500}
    //         height={500}
    //         priority
    //         className="w-2/4 sm:w-2/5 md:w-1/3 lg:w-1/4 h-auto"
    //       />
    //       <div className="flex flex-col gap-5 w-full sm:w-1/2 md:w-2/5 lg:w-2/5">
    //         <div className="w-full flex gap-5 justify-center items-center">
    //           <Google props="text-blue-500 text-2xl md:text-3xl" />
    //           <Facebook props="text-blue-500 text-2xl md:text-3xl" />
    //         </div>
    //         <div className="flex items-center gap-5 justify-center">
    //           <div className="flex-1 border-t border-gray-300"></div>
    //           <span className="text-gray-400 font-semibold">Or</span>
    //           <div className="flex-1 border-t border-gray-300"></div>
    //         </div>
    //         <LoginForm />
    //       </div>
    //     </div>

    //     {/* footer */}
    //     <div className=" hidden sm:block">
    //       <Footer />
    //     </div>
    //   </div>
    // </main>

    <div className="w-full">
      <div className="w-full relative mb-[800px]">
        {/* Banner */}
        <header className="relative w-full h-[400px]">
          <Image
            src={banner}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />

          {/* Title */}
          <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
            <h1>Welcome Back!</h1>
          </div>

          {/* Line */}
          <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div>

          {/* Description */}
          <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
            <p>
              Access your account to view saved properties, manage your
              preferences, and more.
            </p>
          </div>
        </header>

        <div className="w-full absolute mx-auto top-[330px] px-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
