// export const videoStreamHLS: RequestHandler = (req, res) => {
//     const chapterId = uuidv4();
//     const videoPath = req?.file?.path;
//     const outputFileName = "output.m3u8";
//     // const filePath = path.join(
//     //   __dirname,
//     //   "../uploads",
//     //   `${chapterId}/${outputFileName}`
//     // );

//     const outputDir = path.join(__dirname, "../uploads", chapterId);
//     console.log("outputDir", outputDir);
//     const filePath = path.join(outputDir, outputFileName);
//     console.log("filePath", filePath);
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }

//     console.log("filePath", filePath);

//     if (!filePath) return res.status(200).json({ msg: "No such file exists!" });
//     const ffmpegPath = "/opt/homebrew/bin/ffmpeg";

//     // Construct the ffmpeg command
//     const command = `${ffmpegPath} -i "${videoPath}" \
//       -map 0:v -c:v libx264 -crf 23 -preset medium -g 48 \
//       -map 0:a -c:a aac -b:a 128k \
//       -hls_time 10 -hls_playlist_type vod -hls_flags independent_segments \
//       -f hls "${filePath}"`;

//     console.log("Executing command:", command);

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error("FFmpeg error:", error);
//         console.error("FFmpeg stderr:", stderr);
//         return res
//           .status(500)
//           .json({ error: "Failed to convert video to HLS format" });
//       }

//       console.log("FFmpeg stdout:", stdout);
//       console.error("FFmpeg stderr:", stderr);

//       const videoUrl = `uploads/${chapterId}/${outputFileName}`;
//       res.json({
//         success: true,
//         message: "Video uploaded and converted to HLS.",
//         videoUrl,
//       });
//     });
// const ffmpegPath = "/opt/homebrew/bin/ffmpeg";

// const command = `${ffmpegPath} -i "${videoPath}" \
// -map 0:v -c:v libx264 -crf 23 -preset medium -g 48 \
// -map 0:v -c:v libx264 -crf 28 -preset fast -g 48 \
// -map 0:v -c:v libx264 -crf 32 -preset fast -g 48 \
// -map 0:a -c:a aac -b:a 128k \
// -hls_time 10 -hls_playlist_type vod -hls_flags independent_segments -report \
// -f hls "${filePath}"`;

// // const command = `${ffmpegPath} -i "${videoPath}" \
// // -map 0:v -c:v libx264 -crf 23 -preset medium -g 48 \
// // -map 0:a -c:a aac -b:a 128k \
// // -hls_time 10 -hls_playlist_type vod -hls_flags independent_segments \
// // -f hls "${outputPath}"`;

// //const command = `ffmpeg -i "${videoPath}" -f hls "${filePath}"`;

// console.log("command", command);

// exec(command, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`ffmpeg exec error: ${error}`);
//     return res
//       .status(500)
//       .json({ error: "Failed to convert video to HLS format" });
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
//   const videoUrl = `uploads/${chapterId}/${outputFileName}`;
//   chapters[chapterId] = {
//     videoUrl,
//     title: req.body.title,
//     description: req.body.description,
//   };
//   res.json({
//     success: true,
//     message: "Video uploaded and converted to HLS.",
//     chapterId,
//   });
// });
//};
import { RequestHandler } from "express";
import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";


export const videoStreamHLSCopy: RequestHandler = (req, res) => {
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
