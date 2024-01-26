import React, { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMenuGridO } from "react-icons/cg";

import { navLinks } from "@/constants";
import useMenuActive from "@/hooks/useMenuActive";
import Route from "./route";
import { Button } from "../ui/button";

type Props = {
  user: User;
};

export default function NavMobile({ user }: Props) {
  const router = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  function mobileMenuHandler() {
    setOpenMobileMenu(!openMobileMenu);
  }

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <CgMenuGridO size={25} />
      </SheetTrigger>
      <SheetContent className="py-20">
        <SheetHeader>
          <SheetTitle className="flex justify-center text-2xl py-10 border-b">
            Wanderer
          </SheetTitle>
        </SheetHeader>
        <ul className="flex items-center justify-center gap-5 flex-col mt-5  py-10 border-b">
          {navLinks.map((link, index) => {
            const isActive = useMenuActive(link.route);
            return (
              <li key={index}>
                <Route
                  route={link.route}
                  label={link.label}
                  isActive={isActive}
                  onClick={() => setOpenMobileMenu(false)}
                />
              </li>
            );
          })}
        </ul>
        {user ? (
          <div>
            <ul className="flex flex-col  gap-5 items-center py-10">
              <Link href="/create" onClick={() => setOpenMobileMenu(false)}>
                <li>Create a Post</li>
              </Link>
              <Link href="/userposts" onClick={() => setOpenMobileMenu(false)}>
                <li>My Post</li>
              </Link>
              <li onClick={() => signOut()}>Sign Out</li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-5 flex-1 flex-col py-10">
            <Button onClick={() => router.push("/access")}>Log In</Button>
            <Button onClick={() => router.push("/access")}>Sign Up</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
