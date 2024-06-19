import Image from "next/image";
import { Facebook, Google } from "@/icons";
import image from "@/images/register-logo.png";
import Footer from "@/components/organisms/footer/Footer";
import SignupForm from "@/components/organisms/auth/form-signin/SignupForm";

const Page: React.FC = () => {
  return (
    <div
      className="container mx-auto p-4 md:py-20"
      style={{ maxWidth: "1300px" }}
    >
      <div className="flex flex-col sm:flex-row gap-8 md:gap-32 justify-center items-center mb-10">
        <Image
          src={image}
          alt="Login logo"
          width={500}
          height={500}
          priority
          className="w-2/4 sm:w-2/5 md:w-1/3 lg:w-1/4 h-auto"
        />
        <div className="flex flex-col gap-5 w-full sm:w-1/2 md:w-2/5 lg:w-2/5">
          <div className="w-full flex gap-5 justify-center items-center">
            <Google props="text-blue-500 text-2xl md:text-3xl" />
            <Facebook props="text-blue-500 text-2xl md:text-3xl" />
          </div>
          <div className="flex items-center gap-5 justify-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-400 font-semibold">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <SignupForm />
        </div>
      </div>

      {/* footer */}
      <div className=" hidden sm:block">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
