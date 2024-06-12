// import axios from 'axios';


import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string
}

interface MenuProp {
  menu: IMenus[]
}

function NavigateList({ menu }: MenuProp) {
  return (
    <>
      <ul className=" flex md:flex-row flex-col gap-5 md:gap-10 text-[18px] mb-2 md:mb-0 p-5 ">

        {menu.map((item, id) => (
          <Link href={`${item.slug} `} key={id} className=" capitalize hover:text-[blue] hover:font-[600] " >
            {item.name}
          </Link>
        ))}
      </ul>
    </>
  );
}

export default NavigateList;
