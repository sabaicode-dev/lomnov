// import { menu } from "@/components/organisms/header/Header";
import { Facebook, Instagram, TwitterX } from "@/icons";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className="w-full ">
        <div className=" xl:w-[1300px] m-auto border-t-[1px] border-solid border-black flex flex-col gap-5 py-5 ">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3  lg:gap-28 gap-5 px-5 mb-10">
            <div className="flex flex-col  items-center md:items-start gap-5">
              <h1 className="text-[20px] font-[500]">About Us</h1>
              <p className=" text-center md:text-left">
                Real Esate is a online real esate Platform tht can allow all
                user make buy, rent or sell and make own business on this
                platform
              </p>
            </div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-[20px] font-[500]">Contact Us</h1>
              <p className=" text-center">
                Phone Number: (+855)12358993 <br />
                Location:Corner Street 302 and Street 63 Sangkat Boeng Keng Kang
                Ti Muoy, Phnom Penh 12302
              </p>
            </div>
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-[20px] font-[500]">Find Us</h1>
              <div className=" flex flex-row gap-5">
                <Facebook props="text-[28px] text-blue-500" />
                <TwitterX props="text-[24px]" />
                <Instagram props="text-[28px] text-red-600" />
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-5 items-center">
            <ul className="flex flex-row gap-5 ">
              {/* {menu.map((item, id) => (
                <Link key={id} href="" className="text-[#808080b0] text-[14px]">
                  {item.name}
                </Link>
              ))} */}
            </ul>
            <div className="flex gap-5 items-center ">
              <div className="w-[45px] h-[45px] rounded-full bg-gray-500"></div>
              <h1 className="text-[24px] font-[600]">Real Esate</h1>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
