import { BlogPost } from "../models/BlogPost.js";

export async function listBlogPosts(_req, res, next) {
  try {
    const posts = await BlogPost.find().populate("author", "name role").sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return next(error);
  }
}

export async function getBlogPostById(req, res, next) {
  try {
    const post = await BlogPost.findById(req.params.id).populate("author", "name role");
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    return res.json(post);
  } catch (error) {
    return next(error);
  }
}

export async function createBlogPost(req, res, next) {
  try {
    const post = await BlogPost.create({
      ...req.body,
      author: req.user.sub,
    });
    return res.status(201).json(post);
  } catch (error) {
    return next(error);
  }
}

export async function updateBlogPost(req, res, next) {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("author", "name role");

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.json(post);
  } catch (error) {
    return next(error);
  }
}

export async function deleteBlogPost(req, res, next) {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
