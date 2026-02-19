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
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Roha Health Journal</h1>
        <p className="mt-2 text-slate-600">Guides, preventive care tips, and medical updates from Roha Hospital teams.</p>
      </section>

      <div className="grid gap-4">
        {data?.map((post) => (
          <article key={post._id} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 max-h-16 overflow-hidden text-sm text-slate-600">{post.content}</p>
            <Link href={`/blog/${post._id}`} className="mt-3 inline-block text-sm font-medium text-sky-700 hover:text-sky-800">
              Read full article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
