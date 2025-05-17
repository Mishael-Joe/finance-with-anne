/**
 * YouTube Video Grid Component
 *
 * Displays a responsive, paginated grid of educational or promotional YouTube videos.
 * Each card includes a video thumbnail, play overlay, title, and short description.
 * Designed to support user engagement with curated multimedia content.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";

interface YoutubeVideoType {
  videoLink: string;
  h3: string;
  pTag: string;
}

const videos: YoutubeVideoType[] = [
  {
    videoLink: "https://youtu.be/wGvjr-shdNE?si=LZyVjJoCw7rW6ARf",
    h3: "Video Title 1",
    pTag: "Description for video 1",
  },
  {
    videoLink: "https://youtu.be/GaB6_OF5Hpw?si=TC3GUCGIvpvq03eB",
    h3: "Video Title 2",
    pTag: "Description for video 2",
  },
  {
    videoLink: "https://youtu.be/F4tp-rtOS5k?si=Gz1QxMdENNiusVQ7",
    h3: "Video Title 3",
    pTag: "Description for video 3",
  },
  {
    videoLink: "https://youtu.be/jfzt7xWxUgU?si=2w_bkRV6riaVPYGd",
    h3: "Video Title 4",
    pTag: "Description for video 4",
  },
  {
    videoLink: "https://youtu.be/ECZhm9i-7v4?si=-cmWR_lK8bkel_Bq",
    h3: "Video Title 5",
    pTag: "Description for video 5",
  },
  {
    videoLink: "https://youtu.be/fYT4MOEmHtg?si=JQsCGSXogPqUU3EJ",
    h3: "Video Title 6",
    pTag: "Description for video 6",
  },
];

// Helper to extract thumbnail from YouTube URL
const getYoutubeThumbnail = (url: string): string => {
  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    if (parsedUrl.hostname === "youtu.be") {
      // Handle short URLs like https://youtu.be/VIDEO_ID
      videoId = parsedUrl.pathname.slice(1); // remove the leading "/"
    } else {
      // Handle long URLs like https://www.youtube.com/watch?v=VIDEO_ID
      videoId = parsedUrl.searchParams.get("v") || "";
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return "/placeholder.svg"; // fallback if URL parsing fails
  }
};

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    }

    return ""; // fallback if not recognized
  } catch {
    return "";
  }
}

export function YoutubeVideoGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const visibleVideos = videos.slice(currentIndex, currentIndex + 3);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + 3 < videos.length;

  const openModal = (videoUrl: string) => {
    setActiveVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveVideo(null);
  };

  return (
    <div className="relative">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-6">
        {visibleVideos.map((video) => (
          <div
            key={video.videoLink}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-border cursor-pointer"
            onClick={() => openModal(video.videoLink)}
          >
            <div className="aspect-video relative bg-muted">
              <Image
                src={getYoutubeThumbnail(video.videoLink)}
                alt={video.h3}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>

            {/* <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{video.h3}</h3>
              <p className="text-muted-foreground">{video.pTag}</p>
            </div> */}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {(canScrollLeft || canScrollRight) && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
          <Button
            variant="primary"
            size="sm"
            className={`rounded-full shadow-md pointer-events-auto ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`rounded-full shadow-md pointer-events-auto ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
      {/* {(canScrollLeft || canScrollRight) && (
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            size="sm"
            disabled={!canScrollLeft}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={!canScrollRight}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )} */}

      {/* Modal with Autoplay */}
      {isOpen && activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(activeVideo)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
