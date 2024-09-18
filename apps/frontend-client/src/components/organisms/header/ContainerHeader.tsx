"use client";
import React, { useEffect, useState } from "react";
import NavigateList from "@/components/molecules/navigate-list/NavigateList";
import Menu from "@/icons/Menu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/lomnov-logo.png";
import SelectLang from "@/components/molecules/select-lang/SelectLang";
import { BiUser } from "react-icons/bi";
import { Setting, SignOut, User } from "@/icons";
import axios from "axios";

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

// Define the TypeScript interface for the user data
interface UserData {
  _id: string;
  cognitoSub: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  age: number | null;
  background: string[];
  createdAt: string;
  dateOfBirth: string;
  favorite: string[];
  gender: string;
  location: string;
  phoneNumber: string;
  profile: string[];
  role: string;
  updatedAt: string;
  userName: string;
}


function ContainerHeader({
  menu,
  showLogo = true,
  showAuthLinks = true,
}: MenuProp) {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const handleClickMenu = () => {
    setIsMenu((isMenu) => !isMenu);
  };

  // Step 1: Create state for storing user data
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState(null); // Optional: for handling errors
  const [loading, setLoading] = useState(true); // Optional: for loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Set loading to true before making the request
        const response = await axios.get(
          "http://localhost:4000/api/v1/users/me",

          {withCredentials: true },
        );
        console.log(response.data)
        setUserData(response.data); // Step 2: Store the fetched data in state
      } catch (error: any) {
        setError(error.response?.data || error.message); // Handle the error
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  // if (error) {
  //   return <div>Error: {error}</div>; // Display an error message if the request fails
  // }
  return (
    <>
      <div className=" xl:w-[1300px] w-full lg:m-auto h-full flex flex-row items-center justify-between py-3 px-3 xl:px-0 z-20 ">
        <div onClick={() => handleClickMenu()} className=" md:hidden mt-4">
          <Menu props=" mr-2 text-[25px] text-white" />
        </div>
        <Link
          href={"/"}
          className="w-[50%] md:w-[30%] xl:w-[20%] flex gap-2 md:gap-3 items-center justify-start "
        >
          {showLogo && (
            <div className="lg:w-[100px] lg:h-[60px] w-[100px] h-[70px] flex items-center ">
              <Image
                src={logo}
                alt=""
                width="800"
                height="800"
                objectFit="cover"
              />
            </div>
          )}
          {/* <span className=" md:text-[20px] lg:text-[30px] text-[16px] font-[600]  ">
            Real Estate
          </span> */}
        </Link>

        <div
          className={
            isMenu
              ? `lg:w-[40%] xl:w-[50%] w-[65%] h-[100vh] md:h-fit bg-gradient-to-r bg-gray md:bg-transparent shadow-lg  md:shadow-none fixed md:static left-0 top-0 flex md:flex-row flex-col md:items-center md:justify-center transition-all ease-in-out duration-500 bg-olive-green `
              : "lg:w-[40%] xl:w-[60%] w-[65%] h-[100vh] md:h-auto bg-gradient-to-r  md:bg-transparent shadow-lg md:shadow-none fixed md:static left-[-100%] top-0 flex md:flex-row flex-col md:items-center  md:justify-center transition-all ease-in-out duration-500  "
          }
        >
          <div className=" w-full h-[80px] bg-black flex flex-row items-center px-5 gap-3 md:hidden ">
            {/* <div className=" w-[50px] h-[50px] bg-white rounded-full"> */}
            <Image src={logo} alt="" width="100" height="100" />
            {/* </div> */}
            {/* <p className=" text-white font-bold text-[18px]">Real Estate</p> */}
          </div>

          <NavigateList menu={menu} />
          <div className="md:hidden w-[100px] bg-white">
            <SelectLang />
          </div>
        </div>
        {showAuthLinks && (
          // <div className=" w-[50%] md:w-[30%] xl:w-[20%] flex  gap-3 items-center justify-end ">
          //   <div className=" font-[500] flex gap-2 items-center">
          //     <Link className=" font-[600] text-[14px] lg:text-[16px]" href={"signin"}> SIGN IN </Link> |
          //     <Link className=" font-[600] text-[14px] lg:text-[16px]" href={"signup"}> SIGN UP</Link>
          //   </div>
          // </div>

          // <div className=" py-[3.5px] px-5 border-[1.5px] rounded-[10px] ">
          // </div>

          <div className=" w-[50%] md:w-[30%] xl:w-[20%] flex  gap-3 items-center justify-end">
            {/* <select name="" id="" className="bg-transparent border-none outline-none appearance-none text-white ">
              <option value="kh">Khmer <Image src={logo} alt=""/></option>
              <option value="eng">English <Image src={logo} alt="" width={500} height={500}/></option>
            </select> */}

            <div className="hidden md:flex w-[150px]">
              <SelectLang />
            </div>
            {/*
            <Link
              href={"/signin"}
              className=" md:py-[5px] md:px-5 py-[5px] px-4 border-[1px] md:border-[2px] border-[#E5D2B0] rounded-[8px] md:text-[18px] text-white md:font-[600] font-[500] hover:border-white"
            >
              Login
            </Link> */}

            {
              <div className=" relative">
                <div className=" w-[50px] h-[50px] rounded-full bg-black border flex justify-center items-center overflow-hidden relative">
                  <Image
                    src={""}
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                </div>
                <div className=" w-[220px]  bg-white absolute right-0  rounded-md flex flex-col items-center px-3 py-2">
                  <div className=" w-full flex flex-row items-center justify-start gap-2">
                    <div className=" w-[50px] h-[50px] rounded-full border-[1px] border-blue-400 ">
                      <Image src={userData?.profile[0]!} alt="" />
                    </div>
                    <p className=" text-[14px]">{ userData!.userName }</p>
                  </div>
                  <div className="flex flex-col items-start justify-start mt-3 border-y-[1px] border-y-blue-500  w-full py-3">
                    <Link
                      href={""}
                      className=" hover:bg-blue-500 hover:text-white w-full rounded-lg p-2 flex items-center gap-2"
                    >
                      <User props=" text-olive-green " /> Profile{" "}
                    </Link>
                    <Link
                      href={""}
                      className=" hover:bg-blue-500 hover:text-white w-full rounded-lg p-2 flex items-center gap-2"
                    >
                      {" "}
                      <Setting props=" text-olive-green " /> Setting{" "}
                    </Link>
                  </div>
                  <button className="mt-2 p-2  w-full rounded-[25px] font-[500] flex items-center">
                    {" "}
                    <SignOut /> Logout{" "}
                  </button>
                </div>
              </div>
            }
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
