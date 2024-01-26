import React from "react";

import { db } from "@/lib/database";
import UserPosts from "@/components/shared/userPosts";
import getCurrentUser from "../actions/currentUser";

export default async function UserPost() {
  const user = await getCurrentUser();
  const posts = await db.blog.findMany({
    where: {
      userEmail: user?.email ?? undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="container mx-auto">
      <div className="w-full h-screen">
        {!user ? (
          <h1 className="text-3xl font-extrabold">
            Sign in to view your post!
          </h1>
        ) : (
          <div className="max-w-[90%] mx-auto">
            <div className="w-full text-center mb-10">
              <h1 className="text-3xl font-extrabold text-tertiary">
                Hello {user?.name}
              </h1>
              <span className="text-lg">
                You have published {posts.length} posts
              </span>
            </div>
            <UserPosts posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
}
