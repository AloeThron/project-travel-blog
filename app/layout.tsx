import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Navbar from "@/components/shared/navbar";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Travel Blog App",
  description: "Travel Blog next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} overflow-x-hidden bg-[#fffcf2]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
