import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/useAuth";
import { cookies } from "next/headers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Lomnov",
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <AuthProvider isLogin={!userCookie}>{children}</AuthProvider>
      </body>
    </html>
  );
}
