import React from "react";
import Image from "next/image";

import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";

import Tag from "@/components/shared/tag";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/lib/utils";

type Props = {
  params: PostTypes;
};

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function page({ params }: Props) {
  const { id } = params;
  const post = await getData(id);

  return (
    <div className="container mx-auto">
      <div className="w-full h-[400px] relative mb-5">
        <Image
          fill
          alt="image for blog"
          src={post.img}
          className="object-cover"
        />
      </div>

      <Tag text={post.category} />
      <h2 className="text-4xl font-extrabold uppercase text-tertiary my-3">
        {post.title}
      </h2>

      <div className="flex md:gap-20 gap-5 relative mt-14 md:flex-row flex-col">
        <aside
          className="md:sticky
      md:top-3/4 md:h-screen
      "
        >
          <span className="uppercase text-2xl font-extrabold text-tertiary">
            Share:
          </span>
          <div className="flex text-3xl gap-5 text-gray-400 mt-2 [&>*]:border">
            <AiOutlineFacebook />
            <AiOutlineInstagram />
            <AiOutlineTwitter />
          </div>
        </aside>

        <article>
          <p className="text-xl leading-8">{post.desc}</p>

          <div className="mt-20 flex gap-5 items-center">
            <Image
              src={post.user.image}
              width={300}
              height={300}
              alt={`Image of ${post.authorName}`}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex gap-1 flex-col">
              <span>{post.user.name}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
