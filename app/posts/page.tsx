import React from "react";
import Posts from "@/components/shared/posts";
import TopPost from "@/components/shared/topPost";
import {db} from "@/lib/database";
import { PostTypes } from "@/types/postTypes";

type Props = {};

export default async function PostPage({}: Props) {
  const posts = await db.blog.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div>
      <div className="grid lg:grid-cols-3 lg:gap-10 grid-cols-1 w-[95%] max-w-[1450px] mx-auto overflow-y-hidden h-fit mt-10 max-lg:space-y-7">
        <Posts posts={posts} />
        <TopPost posts={posts} />
      </div>
    </div>
  );
}
