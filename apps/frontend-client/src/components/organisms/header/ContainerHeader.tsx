"use client";
import React, { useState } from "react";
import NavigateList from "@/components/molecules/navigate-list/NavigateList";
import Menu from "@/icons/Menu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo-main.png";

interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string;
}

export interface MenuProp {
  menu: IMenus[];
  showLogo?: boolean;
  showAuthLinks?: boolean;
}

function ContainerHeader({ menu, showLogo = true, showAuthLinks = true }: MenuProp) {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const handleClickMenu = () => {
    setIsMenu((isMenu) => !isMenu);
  };

  return (
    <>
      <div className=" xl:w-[1300px] w-full m-auto h-full flex flex-row items-center justify-between py-3 px-5 xl:px-0  z-20 bg-white">
        <div onClick={() => handleClickMenu()} className=" md:hidden ">
          <Menu props=" mr-2 text-[25px]" />
        </div>
        <Link
          href={"/"}
          className="  w-[50%]  md:w-[30%] xl:w-[20%] flex gap-2 md:gap-3 items-center justify-start"
        >
          {showLogo && (
            <div className="lg:w-[60px] lg:h-[60px] w-[50px] h-[50px]  rounded-full bg-slate-400">
              <Image src={logo} alt="" width="500" height="500" />
            </div>
          )}
          <span className=" md:text-[20px] lg:text-[30px] text-[16px] font-[600] italic ">
            {/* Lomnov */}
          </span>
        </Link>

        <div
          className={
            isMenu
              ? `lg:w-[40%] xl:w-[50%] w-[65%] h-[100vh] md:h-fit bg-gradient-to-r bg-white md:bg-transparent shadow-lg  md:shadow-none fixed md:static left-0 top-0 flex md:flex-row flex-col md:items-center md:justify-center  transition-all ease-in-out duration-500  `
              : "lg:w-[40%] xl:w-[60%] w-[65%] h-[100vh] md:h-auto bg-gradient-to-r bg-white md:bg-transparent shadow-lg md:shadow-none fixed md:static left-[-100%] top-0 flex md:flex-row flex-col md:items-center md:justify-center transition-all ease-in-out duration-500  "
          }
        >
          <div className=" w-full h-[80px] bg-[#000000e0] flex flex-row items-center px-5 gap-3 md:hidden">
            <div className=" w-[50px] h-[50px] bg-white rounded-full">
              <Image src={logo} alt="" width="500" height="500" />
            </div>
            <p className=" text-white font-bold italic text-[18px]">Lomnov</p>
          </div>
          <NavigateList menu={menu} />
        </div>
        {showAuthLinks && (
          <div className=" w-[50%] md:w-[30%] xl:w-[20%] flex  gap-3 items-center justify-end ">
            <div className=" font-[500] flex gap-2 items-center">
              <Link className=" font-[600] text-[14px] lg:text-[16px]" href={"signin"}> SIGN IN </Link> |
              <Link className=" font-[600] text-[14px] lg:text-[16px]" href={"signup"}> SIGN UP</Link>
            </div>
          </div>
        )}
      </div>

      {isMenu && (
        <div
          className=" fixed top-0 left-0 bg-[#00000027] w-full h-screen md:hidden -z-10"
          onClick={() => handleClickMenu()}
        ></div>
      )}
    </>
  );
}

export default ContainerHeader;
