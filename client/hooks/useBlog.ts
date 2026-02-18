"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPosts,
  updateBlogPost,
  type BlogPayload,
} from "@/services/blog";

export function useBlogPosts() {
  return useQuery({ queryKey: ["blog"], queryFn: getBlogPosts });
}

export function useBlogPost(id: string) {
  return useQuery({ queryKey: ["blog", id], queryFn: () => getBlogPostById(id), enabled: Boolean(id) });
}

export function useBlogMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (payload: BlogPayload) => createBlogPost(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BlogPayload> }) => updateBlogPost(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteBlogPost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog"] }),
  });

  return { create, update, remove };
}
