import { Router } from "express";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostById,
  listBlogPosts,
  updateBlogPost,
} from "../controllers/blog.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBlogPostSchema, idParamSchema, updateBlogPostSchema } from "../utils/validators.js";

const router = Router();

router.get("/", listBlogPosts);
router.get("/:id", validate(idParamSchema), getBlogPostById);
router.post("/", requireAuth, requireRole("admin"), validate(createBlogPostSchema), createBlogPost);
router.patch("/:id", requireAuth, requireRole("admin"), validate(updateBlogPostSchema), updateBlogPost);
router.delete("/:id", requireAuth, requireRole("admin"), validate(idParamSchema), deleteBlogPost);

export default router;
