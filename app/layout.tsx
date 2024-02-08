import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import AuthContext from "@/context/authContext";
import getCurrentUser from "./actions/currentUser";

import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Travel Blog App",
  description: "Travel Blog next app",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <AuthContext>
        <EdgeStoreProvider>
          <body className={`${roboto.className} overflow-x-hidden bg-white`}>
            <Navbar user={user as any} />
            {children}
            <Footer />
          </body>
        </EdgeStoreProvider>
      </AuthContext>
    </html>
  );
}
