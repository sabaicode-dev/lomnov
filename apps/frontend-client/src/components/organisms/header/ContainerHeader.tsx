"use client";
import React, { useState } from "react";
import NavigateList from "@/components/molecules/navigate-list/NavigateList";
import Menu from "@/icons/Menu";
import Link from "next/link";
// ===================

interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string
}

interface MenuProp {
  menu: IMenus[]
}


function ContainerHeader({ menu }: MenuProp) {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  console.log(isMenu);
  const handleClickMenu = () => {
    setIsMenu((isMenu) => !isMenu);
    console.log(isMenu);
  };
  return (
    <>
      <div className=" xl:w-[1300px] w-full m-auto h-full flex flex-row items-center justify-between py-3 px-5 lg:px-0  z-20 ">
        <div onClick={() => handleClickMenu()} className=" md:hidden ">
          <Menu props=" mr-2 text-[25px]" />
        </div>
        <Link
          href={"/"}
          className="  w-[50%]  md:w-[30%] xl:w-[20%] flex gap-2 md:gap-5 items-center justify-start"
        >
          <div className="lg:w-[50px] lg:h-[50px] w-[45px] h-[45px]  rounded-full bg-slate-400"></div>
          <span className=" md:text-[20px] lg:text-[30px] text-[16px] font-[600] ">
            Real Estate
          </span>
        </Link>

        <div
          className={
            isMenu
              ? `lg:w-[40%] xl:w-[50%] w-[65%] h-[100vh] md:h-fit bg-gradient-to-r bg-white md:bg-transparent shadow-lg  md:shadow-none fixed md:static left-0 top-0 flex md:flex-row flex-col md:items-center md:justify-center  transition-all ease-in-out duration-500  `
              : "lg:w-[40%] xl:w-[60%] w-[65%] h-[100vh] md:h-auto bg-gradient-to-r bg-white md:bg-transparent shadow-lg md:shadow-none fixed md:static left-[-100%] top-0 flex md:flex-row flex-col md:items-center md:justify-center transition-all ease-in-out duration-500  "
          }
        >
          <div className=" w-full h-[80px] bg-blue-400 flex flex-row items-center px-5 gap-3 md:hidden">
            <div className=" w-[40px] h-[40px] bg-white rounded-full"></div>
            <p className=" text-white font-bold">Real Esate</p>
          </div>
          {/* navigate list */}
          <NavigateList menu={menu} />
        </div>
        {/* autenticate */}
        <div className=" w-[50%] md:w-[30%] xl:w-[20%] flex  gap-3 items-center justify-end">
          <div className=" font-[500] flex gap-2 text-[14px] lg:text-[16px]">
            <Link className=" font-[600]" href={"/pages/signin"}> SIGN IN </Link> |
            <Link className=" font-[600]" href={"signup"}> SIGN UP</Link>
          </div>
        </div>
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
