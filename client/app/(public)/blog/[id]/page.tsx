"use client";

import { useBlogPost } from "@/hooks/useBlog";

export default function BlogDetailsPage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useBlogPost(params.id);

  if (isLoading) {
    return <p className="text-slate-600">Loading article...</p>;
  }

  if (isError || !data) {
    return <p className="text-red-600">Article not found.</p>;
  }

  return (
    <article className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-sm text-slate-500">By {data.author?.name ?? "Roha Hospital Team"}</p>
      <p className="whitespace-pre-wrap leading-7 text-slate-700">{data.content}</p>
    </article>
  );
}