import NavigateList from "@/components/molecules/navigate-list/NavigateList";

import Menu from "@/icons/Menu";
import Link from "next/link";
import { useState } from "react";
import ContainerHeader from "./ContainerHeader";

interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string
  }

// server fetching  data from the API
async function fetchMenus(): Promise<IMenus[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/menus?lang=eng");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}



async function Header() {
  const menus = await fetchMenus();
  return (
    <>
      <header className="w-full h-[90px] bg-white shadow-md  sticky top-0 z-30">
        <ContainerHeader menu={menus} />
      </header>
    </>
  );
}

export default Header;
