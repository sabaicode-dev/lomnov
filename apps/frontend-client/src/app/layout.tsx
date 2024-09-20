import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header/Header";
import Footer from "@/components/organisms/footer/Footer";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Define different weights you want
});

export const metadata: Metadata = {
  // icons: {
  //   icon: "/favicon-16x16.png", // Use the path relative to the public directory
  // },
  title: "Home | Lomnov",
  description:
    "Sell and rent your 2nd hand items on lomnov.com, the Cambodia #1 buy and sell website. Post free online classified ads of your property, real estate, home, land, shop, condo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={popins.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
