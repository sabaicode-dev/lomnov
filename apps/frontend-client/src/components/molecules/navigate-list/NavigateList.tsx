// import axios from 'axios';


import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string
}

function NavigateList({menu}: IMenus[]) {
  return (
    <>
      <ul className=" flex md:flex-row flex-col gap-5 md:gap-10 text-[18px] mb-2 md:mb-0 p-5 ">
        {menu.length === 0 && <Skeleton />}

        {menu.map((item, id) => (
          <Link href={`${item.slug} `} key={id} className=" capitalize">
            {item.name}
          </Link>
        ))}
      </ul>
    </>
  );
}

export default NavigateList;
