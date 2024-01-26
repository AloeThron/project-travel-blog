"use client";

import Link from "next/link";

import {
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

import useMenuActive from "@/hooks/useMenuActive";
import { navLinks } from "@/constants";
import Route from "./route";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="w-full py-5 bg-secondary mt-10">
      <div className="w-[95%] mx-auto max-w-[1450px]">
        <div className="py-5 border-b border-gray-300 border-opacity-20 flex justify-between items-center max-md:flex-col max-md:gap-8">
          <div className="flex-1">
            <Link href={"/"}>
              <h1 className="text-3xl font-extrabold text-light">
                Wanderer
              </h1>
            </Link>
          </div>

          <div className="flex item-center justify-center gap-16 flex-1 text-black max-md:flex-col max-md:gap-5">
            {navLinks.map((link, index) => {
              const isActive = useMenuActive(link.route);
              return (
                <div key={index} className="text-center">
                  <Route
                    route={link.route}
                    label={link.label}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex gap-5 text-black flex-1 justify-end text-2xl">
            <FaFacebookSquare />
            <FaSquareInstagram />
            <FaSquareXTwitter />
          </div>
        </div>

        <div className="w-full text-center mt-3 text-sm text-black">
          <span>All Rights Reserved Wanderer</span>
        </div>
      </div>
    </div>
  );
}
