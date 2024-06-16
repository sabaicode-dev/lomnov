import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/organisms/header/Header";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Home | Lomnov",
  description: "Sell And Rent your 2nd hand items on lomnov.com, the Cambodia #1 buy and sell website. Post free online classified ads of your property, real estate, home, land, shop, condo",
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header/> */}
        {children}

      </body>
    </html>
  );
}
