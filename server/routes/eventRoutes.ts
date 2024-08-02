import express from "express";
import multer from "multer";
import {
  createEvents,
  getEventDetails,
  getEvents,
  resetNotificationCount,
  sseEvents,
  uploadLargeFile,
} from "../controllers/eventControllers";
import { storage } from "../utils/multerStorage";

const upload = multer({ storage });

const route = express.Router();

route.get("/stream", sseEvents);
route.post("/reset-notification", resetNotificationCount);
route.post("/create", upload.array("images", 5), createEvents);
route.post("/upload", upload.single("file"), uploadLargeFile);

route.get("/get", getEvents);
route.get("/:eventId", getEventDetails);


export default route;
