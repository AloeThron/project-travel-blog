"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Route from "./route";
import NavMobile from "./navMobile";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants";
import useMenuActive from "@/hooks/useMenuActive";
import { Button } from "../ui/button";

type Props = {
  user: User;
};

export default function Navbar({ user }: Props) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "py-4 w-full border-b border-gray-100 mb-8",
        isScrolling ? "fixed top-0 bg-white shadow-lg z-10" : "relative"
      )}
    >
      <div
        className={cn(
          "w-[95%] mx-auto max-w-[1450px] flex items-center justify-between",
          isScrolling && "pb-0 border-none",
          !isScrolling && "pb-5"
        )}
      >
        {/* logo */}
        <div className="flex">
          <Link href={"/"}>
            <h1 className="text-3xl font-extrabold text-primary">Wanderer</h1>
          </Link>
        </div>
        {/* menu */}
        <div>
          <ul className="flex items-center justify-center gap-16 flex-2 max-md:hidden">
            {navLinks.map((link, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const isActive = useMenuActive(link.route);
              return (
                <li key={index}>
                  <Route
                    route={link.route}
                    label={link.label}
                    isActive={isActive}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        {/* user */}
        <div>
          {!user && (
            <div className="flex gap-5 flex-1 justify-end max-md:hidden">
              <Button onClick={() => router.push("/access")}>Log In</Button>
              <Button onClick={() => router.push("/access")}>Sign Up</Button>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user && (
                <div className="flex gap-5 items-center flex-1 justify-end max-md:hidden">
                  <h1>{user.name}</h1>
                  <Image
                    src={user.image as string}
                    width={50}
                    height={50}
                    className="rounded-full border-4 border-primary cursor-pointer"
                    alt={`Image of ${user.name}`}
                  />
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/create" onClick={() => setOpenUserMenu(false)}>
                  Create a post
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/userposts" onClick={() => setOpenUserMenu(false)}>
                  My Post
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="cursor-pointer" onClick={() => signOut()}>
                  Sign out
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* navMobile */}
        <div className="md:hidden">
          <NavMobile user={user} />
        </div>
      </div>
    </nav>
  );
}
