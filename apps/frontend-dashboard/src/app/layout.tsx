import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/useAuth";
import { cookies } from "next/headers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOMNOV",
  description: "This is Deshboard ",
};
const cookieStore = await cookies();
const userCookie = cookieStore.get("id_token");
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider isLogin={!!userCookie}>{children}</AuthProvider>
      </body>
    </html>
  );
}
