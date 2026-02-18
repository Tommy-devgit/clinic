"use client";

import Link from "next/link";
import { useBlogPosts } from "@/hooks/useBlog";

export default function BlogPage() {
  const { data, isLoading, isError } = useBlogPosts();

  if (isLoading) {
    return <p className="text-slate-600">Loading blog posts...</p>;
  }

  if (isError) {
    return <p className="text-red-600">Unable to load blog posts right now.</p>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Health Blog</h1>
      <p className="text-slate-600">Insights from Roha Hospital doctors and care teams.</p>
      <div className="grid gap-4">
        {data?.map((post) => (
          <article key={post._id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 max-h-16 overflow-hidden text-sm text-slate-600">{post.content}</p>
            <Link href={`/blog/${post._id}`} className="mt-3 inline-block text-sm font-medium text-sky-700 hover:text-sky-800">Read full article</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
