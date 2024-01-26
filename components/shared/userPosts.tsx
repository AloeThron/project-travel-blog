"use client";

import React, { useState } from "react";
import BlogCard from "./blogCard";
import DeletePosts from "./deletePosts";
import { PostTypes } from "@/types/postTypes";

type Props = {
  posts: PostTypes[];
};

export default function UserPosts({ posts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const indexOfLastImage = currentPage * postsPerPage;
  const indexOfFirstImage = indexOfLastImage - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  return (
    <div className="mb-5 py-5">
      <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-10">
        {currentPosts.map((post) => (
          <div key={post.id} className="relative">
            <BlogCard post={post as any} />
            <DeletePosts post={post as any} />
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        {Array.from(
          { length: Math.ceil(posts.length / postsPerPage) },
          (_, index) => (
            <button
              className="mx-1 p-2 px-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-200 rounded-lg hover:shadow-sm"
              key={index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
