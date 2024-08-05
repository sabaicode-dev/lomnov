import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Home | Lomnov",
  description:
    "Sell And Rent your 2nd hand items on lomnov.com, the Cambodia #1 buy and sell website. Post free online classified ads of your property, real estate, home, land, shop, condo",
};

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="w-[1300px] m-auto flex gap-5">
          <div>lef</div>
          <div> {children} </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}