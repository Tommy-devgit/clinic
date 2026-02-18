"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useBlogMutations, useBlogPosts } from "@/hooks/useBlog";

export default function AdminBlogPage() {
  const { data, isLoading, isError } = useBlogPosts();
  const { create, remove } = useBlogMutations();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await create.mutateAsync({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Blog Management</h1>

      <form onSubmit={handleCreate} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Create Post</h2>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder="Post title" value={title} onChange={(event) => setTitle(event.target.value)} required />
        <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={6} placeholder="Post content" value={content} onChange={(event) => setContent(event.target.value)} required />
        <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={create.isPending}>{create.isPending ? "Saving..." : "Publish"}</button>
      </form>

      <section className="space-y-3">
        <h2 className="font-semibold">All Posts</h2>
        {isLoading ? <p className="text-sm text-slate-600">Loading posts...</p> : null}
        {isError ? <p className="text-sm text-red-600">Failed to load posts.</p> : null}
        {data?.map((post) => (
          <div key={post._id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-slate-600">{post.content.slice(0, 140)}...</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/blog/${post._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">Edit</Link>
              <button onClick={() => remove.mutate(post._id)} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}