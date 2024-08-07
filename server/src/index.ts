import express, { urlencoded } from "express";
// import http from "http";
// import { Server } from "socket.io";
import cors from "cors";
import path from "path";
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
app.use(urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const port = env.PORT;
app.use(json());
connectDB();

app.use("/", userRoutes);
app.use("/events", eventRoutes);

// Web Sockets
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("message", ({ room, message }) => {
//     console.log("socket", { room, message });
//     socket.to(room).emit("recieve-message", message);
//   });

//   socket.on("joined-room", (roomName) => {
//     console.log("roomName", roomName);
//     socket.join(roomName);
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
