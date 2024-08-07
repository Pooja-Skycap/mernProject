import { useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayers = ({ src }: VideoPlayerProps) => {
  useEffect(() => {
    const player = videojs("videoPlayer", {
      controls: true,
      autoplay: false,
      preload: "auto",
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [src]);

  return (
    <div>
      <video
        id="videoPlayer"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        width="640"
        height="264"
        data-setup="{}"
      >
        <source src={src} type="application/x-mpegURL" />
      </video>
    </div>
  );
};

export default VideoPlayers;
