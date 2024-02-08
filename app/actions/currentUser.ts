import { Options } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { db } from "@/lib/database";

export async function getSession() {
  return await getServerSession(Options);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    console.log("session L", session);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
    };
  } catch (error: any) {
    return null;
  }
}
