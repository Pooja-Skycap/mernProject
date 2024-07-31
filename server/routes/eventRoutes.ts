import express from "express";
import multer from "multer";
import { createEvents, getEvents } from "../controllers/eventControllers";
import { storage } from "../utils/multerStorage";

const upload = multer({ storage });

const route = express.Router();
route.post("/create", upload.array("images", 5), createEvents);
route.get("/get", getEvents);

export default route;
