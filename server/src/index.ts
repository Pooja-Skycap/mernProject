import express from "express";
import { json } from "body-parser";
import { Express} from 'express';
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../db/index";
import env from '../utils/validateEnv';
import userRoutes from '../routes/userRoutes'


const app: Express = express();
const port = env.PORT;
app.use(json());
connectDB();

app.get("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
