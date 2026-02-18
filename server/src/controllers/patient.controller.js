import { User } from "../models/User.js";

export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.sub).select("name email role createdAt");
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
