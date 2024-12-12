import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header/Header";
import Sidebar from "@/components/organisms/sidebar/Sidebar ";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Lomnov",
  description: "This is Deshboard ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={inter.className}
      >    
        <div className="flex flex-col">
           <Header/>
           <div className="flex">
              <Sidebar/>
              <div className="m-[40px] w-[100%]">
              {children}
              </div>
           </div>
        </div>  
      
      
      </body>
    </html>
  );
}
