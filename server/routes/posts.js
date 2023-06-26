import express from "express";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/", verifyToken, getFeedPosts); // grab user feed posts in home page
router.get("/:userId/posts", verifyToken, getUserPosts); //to get posts of a specific user

/*UPDATE*/
router.patch("/:id/like", verifyToken, likePosts); // liking and unliking

export default router;
