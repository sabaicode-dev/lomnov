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





import dynamic from 'next/dynamic';
import { fetchMenus } from '@/libs/fetch-data/api';
import { IMenus } from '@/libs/types/api-menus/menu-response';

// Dynamically import ClientHeader to ensure it only runs on the client-side
const ClientHeader = dynamic(() => import('./ClientHeader'), { ssr: false });

const Header = async () => {
  const menus: IMenus[] = await fetchMenus();

  return (
    <ClientHeader menus={menus} />
  );
};

export default Header;

