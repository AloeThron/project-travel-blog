"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { GoogleLoginButton } from "react-social-login-buttons";
import { Button } from "@/components/ui/button";

type Props = {};

export default function Access({}: Props) {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Authenticated");
      router.push("/");
    }
  }, [session?.status, router]);

  const loginAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          return;
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="my-24 sm:mx-auto sm:max-w-4xl px-5">
      <div className="bg-white shadow sm:rounded-lg flex gap-5 justify-between h-96 overflow-hidden">
        <div className="mt-6 flex gap-2 flex-col justify-center items-center mx-auto">
          <Link href={"/"} className="mb-5">
            <h1 className="text-3xl font-extrabold text-primary">Wanderer</h1>
          </Link>
          <span className="text-sm mb-2">
            Log in or Sign up with the links below
          </span>
          <GoogleLoginButton onClick={() => loginAction("google")} />
        </div>

        <Image
          src="/access.jpg"
          height={500}
          width={500}
          alt="Sign up form image"
          className="object-cover lg:block hidden"
        />
      </div>
    </div>
  );
}
