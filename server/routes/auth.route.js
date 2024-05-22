import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", verifyToken, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;