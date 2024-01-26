"use client";

import React, { useState } from "react";

import { deletePost } from "@/app/actions/blog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PostTypes } from "@/types/postTypes";

type Props = {
  post: PostTypes;
};

export default function DeletePosts({ post }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="absolute top-7 right-5">
      <Button onClick={handleDelete}>Delete</Button>

      {showModal && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div className="w-screen h-screen bg-black/40 absolute" />
            <div
              className="bg-white p-6 rounded shadow-lg z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <p>Are you sure you want to delete this post?</p>
              <div className="flex justify-center gap-3 mt-5">
                <form action={deletePost} onSubmit={closeModal}>
                  <Input type="hidden" name="postId" value={post.id} />
                  <Button type="submit">Yes</Button>
                </form>
                <Button onClick={closeModal}>No</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
