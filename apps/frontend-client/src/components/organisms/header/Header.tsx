"use client";
import Cross from "@/icons/Cross";
import Menu from "@/icons/Menu";
import Link from "next/link";
import { useState } from "react";

export const menu = [
  {
    name: "Home",
    slug: "/",
  },
  {
    name: "Buy",
    slug: "/pages/page-buy",
  },
  {
    name: "Rent",
    slug: "/pages/page-rent",
  },
];

function Header() {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  console.log(isMenu);
  const handleClickMenu = () => {
    setIsMenu((isMenu) => !isMenu);
    console.log(isMenu);
  };
  return (
    <>
      <header className="w-full h-[90px] bg-white shadow-md  sticky top-0 z-20">
        <div className=" xl:w-[1300px] w-full m-auto h-full flex flex-row items-center justify-between py-3 px-5 lg:px-0  ">
          <div onClick={() => handleClickMenu()}>
            <Menu props=" mr-2 text-[25px]" />
          </div>
          <Link
            href={"/"}
            className="  w-[50%]  md:w-[30%] xl:w-[20%] flex gap-2 md:gap-5 items-center justify-start"
          >
            <div className="lg:w-[50px] lg:h-[50px] w-[45px] h-[45px]  rounded-full bg-slate-400"></div>
            <span className="lg:text-[30px] text-[14px] font-[600] ">
              Real Estate
            </span>
          </Link>

          <div
            className={
              isMenu
                ? `lg:w-[40%] xl:w-[50%] w-[65%] h-[100vh] md:h-fit bg-gradient-to-r bg-white shadow-lg md:shadow-none fixed md:static left-0 top-0 flex md:flex-row flex-col md:items-center md:justify-center  transition-all ease-in-out duration-1000  `
                : "lg:w-[40%] xl:w-[60%] w-[65%] h-[100vh] md:h-auto bg-gradient-to-r bg-gray-500 shadow-lg md:shadow-none fixed md:static left-[-100%] top-0 flex md:flex-row flex-col md:items-center md:justify-center transition-all ease-in-out duration-1000  "
            }
          >
            {/* <div
              onClick={() => {
                handleClickMenu();
              }}
              className=" w-[30px] h-[30px] rounded-full bg-white absolute top-2 right-3 flex justify-center items-center"
            >
              <Cross props=" " />
            </div> */}
            <div className=" w-full h-[80px] bg-blue-400 flex flex-row items-center px-5 gap-3 md:hidden">
              <div className=" w-[40px] h-[40px] bg-white rounded-full"></div>
              <p className=" text-white font-bold">Real Esate</p>
            </div>
            <ul className=" flex md:flex-row flex-col gap-5 md:gap-10 text-[18px] mb-2 md:mb-0 p-5 ">
              {/* {menu.map((item, id) => (
                <Link href={`${item.slug} `} key={id}>
                  {item.name}
                </Link>
              ))} */}
              <Link href="/">Home</Link>
              <Link href="/">Rents</Link>
              <Link href="/">Buy</Link>
            </ul>

           
          </div>
          {/* autenticate */}
          <div className=" w-[50%] md:w-[30%] xl:w-[20%] flex  gap-3 items-center justify-end">
            <div className=" font-[500] flex gap-2 text-[14px] lg:text-[16px]">
              <Link href={"/pages/signin"}> SING IN </Link> |
              <Link href={"signup"}> SIGN UP</Link>
            </div>
          </div>
        </div>
      </header>
      {isMenu && (
        <div
          className=" fixed top-0 left-0 bg-[#00000027] w-full h-screen "
          onClick={() => handleClickMenu()}
        >
          {" "}
        </div>
      )}
    </>
  );
}

export default Header;
