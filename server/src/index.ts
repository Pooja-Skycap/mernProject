import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../db/index";
import env from "../utils/validateEnv";
import userRoutes from "../routes/userRoutes";
import eventRoutes from "../routes/eventRoutes";

const app: Express = express();
app.use(cors());

const port = env.PORT;
app.use(json());
connectDB();

app.use("/", userRoutes);
app.use("/events", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
