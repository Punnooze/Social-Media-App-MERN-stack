import express from "express";
import { login } from '../controllers/auth.js';

const router = express.Router(); //allows to identify all these as routes

router.post("/login", login);
export default router;
