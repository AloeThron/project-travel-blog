import React from "react";
import Image from "next/image";
import Link from "next/link";

import Tag from "../shared/tag";
import Overlay from "../shared/overlay";
import { PostTypes } from "@/types/postTypes";

type Props = {
  post: PostTypes;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="relative rounded-lg overflow-hidden">
      <div className="w-[1000px] h-[450px] relative">
        {post.img && (
          <Image
            src={post.img}
            fill
            alt={`image for ${post.title}`}
            className="object-cover"
          />
        )}
        <Overlay />
      </div>

      <div className="absolute w-full h-full top-0 p-5 flex flex-col justify-between">
        <div>
          <Tag text={post.category} />

          <h3 className="text-3xl font-extrabold uppercase text-white">
            {post.title}
          </h3>
        </div>
      </div>

      <Link
        href={`/blog/${post.id}`}
        className="absolute bottom-0 right-0 bg-primary p-5 text-white rounded-tl-lg z-6 cursor-pointer"
      >
        <div>Read more</div>
      </Link>
    </article>
  );
}
