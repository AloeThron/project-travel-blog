"use server";

import { db } from "@/lib/database";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const desc = formData.get("description") as string;
  const cat = formData.get("category") as string;
  const userEmail = formData.get("email") as string;
  const image = formData.get("image") as string;

  await db.blog.create({
    data: {
      img: image,
      title: title,
      desc: desc,
      category: cat,
      userEmail: userEmail,
    },
  });

  revalidatePath("/create");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("postId") as string;

  await db.blog.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/userposts");
}
