import { MouseEvent, useEffect, useRef, useState } from "react";
// import VideoPlayer from "./VideoPlayer";
// import videojs from 'video.js';
import "video.js/dist/video-js.css";

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

  return (
    <div>
      <video ref={videoRef} width="320" height="240" controls autoPlay>
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
      </button>

      {/* <div>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div> */}
    </div>
  );
};

export default Video;
