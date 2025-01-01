"use client";

import React, { useState } from "react";
import useReels from "@/hooks/useReels";
import MainLayout from "@/layout/mainLayout";

const VideoPosts = () => {
  const { data: videoPosts, isLoading, isError, error } = useReels();
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(true); // Default mute state

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  // Handle video click (play/pause)
  const handleVideoClick = (videoId: string) => {
    if (currentVideo === videoId) {
      setCurrentVideo(null); // Pause the current video
    } else {
      setCurrentVideo(videoId); // Play the clicked video
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen pt-28">
        <div className="w-full max-w-xl p-4 shadow-md rounded-md flex h-full items-center">
          {videoPosts && videoPosts.length === 0 ? (
            <p>No video posts available</p>
          ) : (
            videoPosts.map((post: any) => (
              <div
                key={post._id}
                className="post-card mb-8 flex flex-col md:flex-row items-center md:items-start"
              >
                {/* Video Section */}
                <div className="video-container flex-1 h-full relative">
                  <video
                    className="w-full h-auto object-cover"
                    autoPlay
                    loop
                    muted={muted} // Bind the muted state to the video element
                    onClick={() => handleVideoClick(post._id)}
                    controls={false} // Disable the default controls
                  >
                    <source src={post.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom mute/unmute button */}
                  <div
                    className="absolute bottom-4 right-4 text-white cursor-pointer"
                    onClick={toggleMute}
                  >
                    {muted ? (
                      <button className="bg-black p-2 rounded-full">
                        🔇 Mute
                      </button>
                    ) : (
                      <button className="bg-black p-2 rounded-full">
                        🔊 Unmute
                      </button>
                    )}
                  </div>
                </div>

                {/* Interaction Buttons Section */}
                <div className="interaction-buttons flex flex-col space-y-6 ml-4 md:ml-8 items-start">
                  <h3 className="text-xl font-semibold text-center mb-2 w-full">
                    {post.description}
                  </h3>
                  <div className="flex flex-col space-y-4">
                    <button className="text-gray-500 hover:text-black w-full">
                      ❤️ Like
                    </button>
                    <button className="text-gray-500 hover:text-black w-full">
                      💬 Comment
                    </button>
                    <button className="text-gray-500 hover:text-black w-full">
                      💾 Save
                    </button>
                    <button className="text-gray-500 hover:text-black w-full">
                      🔄 Share
                    </button>
                  </div>

                  {/* Comments Section */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default React.memo(() => {
  return <VideoPosts />;
});
