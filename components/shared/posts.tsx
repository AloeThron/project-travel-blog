"use client";

import React, { useState } from "react";

import BlogCard from "./blogCard";
import { Button } from "../ui/button";

import { PostTypes } from "@/types/postTypes";
import { cn } from "@/lib/utils";

type Props = {
  posts: PostTypes[];
};

export default function posts({ posts }: Props) {
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const [selectedCategory, setSeclectedCategory] = useState("all");

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  const filterPostsByCategory = () => {
    if (selectedCategory === "all") {
      return posts.slice(0, visibleBlogs);
    } else {
      return posts
        .filter((post) => post.category === selectedCategory)
        .slice(0, visibleBlogs);
    }
  };

  const categories = [
    "Adventure",
    "Wanderlust",
    "Culture",
    "Discovery",
    "Journeys",
    "Odyssey",
    "Exploration",
  ];

  const handleCategoryChange = (category: string) => {
    setSeclectedCategory(category);
    setVisibleBlogs(5);
  };

  return (
    <section className="container mx-auto col-span-2" aria-labelledby="posts">
      <div className="w-full text-center">
        <h2
          id="posts"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          All Post
        </h2>
      </div>

      <div className="flex justify-center space-x-2 gap-y-2 flex-wrap mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={cn(
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-secondary/60 text-black",
              "px-4 py-2 rounded hover:bg-tertiary/50"
            )}
          >
            {category === "all" ? "All" : category}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-10 h-full">
        {filterPostsByCategory()
          .slice(0, visibleBlogs)
          .map((post, id) => (
            <BlogCard post={post} key={id} />
          ))}
        {visibleBlogs < posts.length && (
          <div className="flex justify-center">
            <Button onClick={showMoreBlogs}>Show more</Button>
          </div>
        )}
      </div>
    </section>
  );
}
