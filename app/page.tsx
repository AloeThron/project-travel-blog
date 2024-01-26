import Hero from "@/components/shared/hero";
import LatestPost from "@/components/shared/latestPost";
import TopPost from "@/components/shared/topPost";
import { db } from "@/lib/database";

export default async function Home() {
  const posts = await db.blog.findMany({
    include: {
      user: true,
    },
  });

  return (
    <>
      <Hero posts={posts} />
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-10 w-[95%] mx-auto max-w-[1450px] overflow-y-hidden h-fit mt-10">
        <LatestPost posts={posts} />
        <TopPost posts={posts} />
      </div>
    </>
  );
}
