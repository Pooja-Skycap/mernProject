import axios from "axios";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
// import VideoPlayer from "./VideoPlayer";
// import videojs from 'video.js';
import "video.js/dist/video-js.css";
import VideoPlayers from "./VideoPlayers";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  });
  const [videoId, setVideoId] = useState("");
  const playVideo = (e: MouseEvent<HTMLButtonElement>, videoName: string) => {
    e.preventDefault();
    setVideoId(videoName);
  };

  console.log("videoId", videoId);

  // --------------------
  // const videoSrc =
  //   "http://localhost:5400/uploads/101d94a2-1656-4660-aa71-5d1c40cdb65e/output.m3u8";

  //   const playerRef = useRef<videojs.Player | null>(null);

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [
  //     {
  //       src: videoSrc,
  //       type: "application/x-mpegURL",
  //     },
  //   ],
  // };

  // const handlePlayerReady = (player: VideoJsPlayer) => {
  //   playerRef.current = player;
  //   player.on("waiting", () => {
  //     videojs.log("player is waiting");
  //   });

  //   player.on("dispose", () => {
  //     videojs.log("player will dispose");
  //   });
  // };
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("video", file);

      axios
        .post("http://localhost:5400/events/uploadVideos", formData)
        .then((response) => {
          setVideoUrl(response.data.videoUrl);
        })
        .catch((error) => {
          console.error("Error uploading video:", error);
        });
    }
  };

  return (
    <div>
      {/* <video ref={videoRef} width="320" height="240" controls autoPlay>
        <source
          src={`http://localhost:5400/events/videos/${videoId}`}
          type="video/mp4"
        ></source>
      </video>
      <button
        onClick={(e) => {
          playVideo(e, "video");
        }}
      >
        Play Video 1
      </button>
      <button
        onClick={(e) => {
          playVideo(e, "animation");
        }}
      >
        Play Video 2
      </button> */}

      <div>
        <h1>Upload and Play Video</h1>
        <input type="file" onChange={handleFileUpload} />
        {videoUrl && <VideoPlayers src={videoUrl} />}
      </div>

      {/* <div>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div> */}
    </div>
  );
};

export default Video;
