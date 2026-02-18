"use client";

import { useState } from "react";
import { useBlogMutations, useBlogPost } from "@/hooks/useBlog";

export default function AdminBlogEditPage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useBlogPost(params.id);
  const { update } = useBlogMutations();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (isLoading) {
    return <p className="text-slate-600">Loading post...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Post not found.</p>;
  }

  const initialTitle = title || data.title;
  const initialContent = content || data.content;

  return (
    <form
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await update.mutateAsync({ id: params.id, payload: { title: initialTitle, content: initialContent } });
      }}
    >
      <h1 className="text-2xl font-semibold">Edit Blog Post</h1>
      <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" value={initialTitle} onChange={(event) => setTitle(event.target.value)} required />
      <textarea className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" rows={8} value={initialContent} onChange={(event) => setContent(event.target.value)} required />
      <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800" disabled={update.isPending}>{update.isPending ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}