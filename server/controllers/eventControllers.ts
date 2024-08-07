import { RequestHandler } from "express";
import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import Events from "../models/eventsModel";
export interface Images {
  originalname: string | null;
  path: string | null;
}
interface EventTitle {
  id?: string;
  title?: string;
}

let newEventCount = 0;
const eventTitle: EventTitle[] = [];

interface Chapters {
  videoUrl: string;
  title: string;
  description: string;
}
interface ChaptersCollection {
  [key: string]: Chapters;
}
const chapters: ChaptersCollection = {};

let clients: Array<
  (data: { count: number; eventTitle: EventTitle[] }) => void
> = [];

export const sseEvents: RequestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const sendEvent = (data: { count: number }) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  clients.push(sendEvent);
  req.on("close", () => {
    clients = clients.filter((client) => client !== sendEvent);
  });
};
export const notifyClients = (eventTitle: EventTitle[]) => {
  clients.forEach((client) => client({ count: newEventCount, eventTitle }));
};

export const resetNotificationCount: RequestHandler = (req, res) => {
  newEventCount = 0;
  // notifyClients();
  res.status(200).json({ message: "Notification count reset" });
};

export const createEvents: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const images =
      files?.map((file) => ({
        originalname: file.originalname || null,
        path: file.path || null,
      })) || [];
    const newEvent = await Events.create({
      title,
      description,
      images,
    });
    newEventCount += 1;
    eventTitle.push({ id: newEvent._id.toString(), title: newEvent.title });

    notifyClients(eventTitle);
    return res.status(201).json(newEvent);
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};

export const videoStream: RequestHandler = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../utils/videos/", `${filename}.mp4`);
  if (!filePath) return res.status(200).json({ msg: "No such file exists!" });
  const fileSize = fs.statSync(filePath).size;
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  } else {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const CHUNK_SIZE = 10 ** 6;
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    // const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    fs.createReadStream(filePath, { start, end }).pipe(res);
  }
};

export const videoStreamCopy: RequestHandler = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const videoPath = req.file.path;
    console.log("videoPath:", videoPath);

    const outputDir = path.join(
      "uploads",
      path.basename(videoPath, path.extname(videoPath))
    );
    console.log("outputDir:", outputDir);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("Starting FFmpeg processing...");

    ffmpeg(videoPath)
      .outputOptions([
        "-loglevel debug",
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-hls_segment_filename",
        path.join(outputDir, "segment_%03d.ts"),
      ])
      .output(path.join(outputDir, "playlist.m3u8"))
      .on("end", () => {
        console.log("Conversion finished!!!!!!!!!");
        res.status(200).json({ message: "Conversion finished" });
      })
      .on("error", (err) => {
        console.error("An error occurred:", err);
        res.status(500).json({ error: "An error occurred during conversion" });
      })
      .run();
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const getVideos: RequestHandler = (req, res) => {
  const chapterId = req.query.chapterId as string | undefined;
  if (!chapterId || !chapters[chapterId]) {
    return res.status(404).json({ error: "Chapter not found" });
  }
  const { title, videoUrl } = chapters[chapterId];
  console.log(title, " ", videoUrl);
  res.json({ title: title, url: videoUrl });
};

export const getEvents: RequestHandler = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 5;
    const sortOrder = req.query.sort as "asc" | "desc";
    const fieldname = req.query.fieldname as string;
    const sort: { [key: string]: "asc" | "desc" } = { [fieldname]: sortOrder };

    if (offset < 0 || limit <= 0) {
      return res.status(400).json({ error: "Invalid offset or limit value" });
    }
    const query = Events.find()
      .skip(offset * limit)
      .limit(limit);

    if (fieldname && (sortOrder === "asc" || sortOrder === "desc")) {
      query.sort(sort);
    }
    const events = await query.exec();
    const totalCount = await Events.countDocuments().exec();

    return res.status(200).json({
      offset,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      events,
    });
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};

export const getEventDetails: RequestHandler = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eachEvent = await Events.findById({ _id: eventId });
    console.log("eachEvent", eachEvent);
    return res.status(200).json({
      eachEvent,
    });
  } catch (error) {
    let errorMessage = "An unknown error has occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
};

export const uploadLargeFile: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { chunk, totalChunks } = req.body;
    const chunkIndex = parseInt(chunk, 10);
    const filePath = path.join(__dirname, "../uploads", `file_${chunkIndex}`);

    fs.rename(req.file.path, filePath, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error moving file", error: err.message });

      if (chunkIndex === parseInt(totalChunks, 10) - 1) {
        const finalFilePath = path.join(__dirname, "../uploads", "finalFile");
        const writeStream = fs.createWriteStream(finalFilePath);

        let chunksRead = 0;
        for (let i = 0; i < totalChunks; i++) {
          const chunkPath = path.join(__dirname, "../uploads", `file_${i}`);
          fs.readFile(chunkPath, (readErr, data) => {
            if (readErr)
              return res.status(500).json({
                message: "Error reading chunk",
                error: readErr.message,
              });

            writeStream.write(data, () => {
              chunksRead++;
              fs.unlink(chunkPath, (unlinkErr) => {
                if (unlinkErr) {
                  console.error("Error deleting chunk:", unlinkErr);
                }
              });
            });

            if (chunksRead == totalChunks) {
              writeStream.end(() => {
                console.log("Final file created successfully");
                res.status(200).json({ message: "File received and combined" });
              });
            }
          });
        }
      } else {
        res.status(200).json({ message: "Chunk received" });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
