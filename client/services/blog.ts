import type { BlogPost } from "@/types/blog";
import { apiClient } from "./apiClient";

export type BlogPayload = {
  title: string;
  content: string;
};

export async function getBlogPosts() {
  const response = await apiClient.get<BlogPost[]>("/blog");
  return response.data;
}

export async function getBlogPostById(id: string) {
  const response = await apiClient.get<BlogPost>(`/blog/${id}`);
  return response.data;
}

export async function createBlogPost(payload: BlogPayload) {
  const response = await apiClient.post<BlogPost>("/blog", payload);
  return response.data;
}

export async function updateBlogPost(id: string, payload: Partial<BlogPayload>) {
  const response = await apiClient.patch<BlogPost>(`/blog/${id}`, payload);
  return response.data;
}

export async function deleteBlogPost(id: string) {
  await apiClient.delete(`/blog/${id}`);
}
