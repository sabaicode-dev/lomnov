import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/useAuth";
import { cookies } from "next/headers";
import { PropertyProvider } from "@/context/property";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Lomnov",
  description: "This is Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Move cookies logic inside the component function
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("idToken");
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <AuthProvider isLogin={!userCookie}>
          <PropertyProvider>
            {children}
          </PropertyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
