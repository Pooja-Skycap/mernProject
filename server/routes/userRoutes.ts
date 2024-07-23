import express from "express";
import { userLogin } from "../controllers/userControllers";
const router = express.Router();

router.get("/", userLogin);

export default router;
