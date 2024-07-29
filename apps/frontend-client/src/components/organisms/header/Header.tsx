// import NavigateList from "@/components/molecules/navigate-list/NavigateList";
// import Menu from "@/icons/Menu";
// import Link from "next/link";
// import { useState } from "react";
// import ContainerHeader from "./ContainerHeader";

// interface IMenus {
//   id?: number;
//   name?: string;
//   slug?: string;
//   lang: string;
// }

// // server fetching  data from the API
// async function fetchMenus(): Promise<IMenus[]> {
//   const res = await fetch("https://lomnov.onrender.com/api/v1/menus?lang=eng");
//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return res.json();
// }

// async function Header() {
//   const menus = await fetchMenus();
//   return (
//     <>
//       <header className="w-full h-[90px] fixed top-0 z-30">
//         <ContainerHeader menu={menus} />
//       </header>
//     </>
//   );
// }

// export default Header;

// // new
// // import dynamic from 'next/dynamic';
// // Dynamically import ClientHeader to ensure it only runs on the client-side
// // const ClientHeader = dynamic(() => import('./ClientHeader'), { ssr: false });
// import { fetchMenus } from '@/libs/fetch-data/api';
// import { IMenus } from '@/libs/types/api-menus/menu-response';
// import ClientHeader from './ClientHeader';

// const Header = async () => {
//   const menus: IMenus[] = await fetchMenus();

//   return (
//     <ClientHeader menus={menus} />
//   );
// };

// export default Header;

"use client";

import { useEffect, useState } from "react";
import ContainerHeader from "./ContainerHeader";
// import { IMenus } from "@/libs/types/api-menus/menu-response";

// interface ClientHeaderProps {
//   menus: IMenus[];
// }

export const menus = [
  {
    id: 1,
    name: "home",
    slug: "/",
    lang: "eng",
  },
  {
    id: 3,
    name: "buy",
    slug: "/buy",
    lang: "eng",
  },
  {
    id: 5,
    name: "rent",
    slug: "/rent",
    lang: "eng",
  },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full h-[90px] fixed top-0 z-30 transition-colors duration-300 ${scrolled ? " bg-olive-drab" : "bg-transparent"}`}
    >
      <ContainerHeader menu={menus} />
    </header>
  );
};

export default Header;
