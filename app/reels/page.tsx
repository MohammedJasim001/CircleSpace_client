"use client";

import React, { useState, useRef } from "react";
import useReels from "@/hooks/useReels";
import MainLayout from "@/layout/mainLayout";
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane, FaSave } from "react-icons/fa";

interface Comment {
  _id: string;
  author: { _id: string; userName: string; profileImage: string };
  content: string;
}

interface Post {
  _id: string;
  content: string; // Video or image URL
  description: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  author: { _id: string; profileImage: string; userName: string }; // User info for the post author
}

const VideoPosts = () => {
  const { data: videoPosts, isLoading, isError, error } = useReels();
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [muted, setMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleLike = (postId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  };

  const toggleMute = () => {
    console.log('objectvd');
    setMuted((prevMuted) => {
      const newMuted = !prevMuted;
      Object.values(videoRefs.current).forEach((videoElement) => {
        if (videoElement) {
          videoElement.muted = newMuted;
        }
      });
      return newMuted;
    });
  };

  const handleSave = (postId: string) => {
    console.log(`Post ${postId} saved`);
  };

  const handleShare = (postId: string) => {
    console.log(`Post ${postId} shared`);
  };

  const togglePlay = (postId: string) => {
    Object.keys(videoRefs.current).forEach((id) => {
      const videoElement = videoRefs.current[id];
      if (videoElement && id !== postId) {
        videoElement.pause();
      }
    });

    const videoElement = videoRefs.current[postId];
    if (videoElement) {
      if (isPlaying[postId]) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying((prevState) => ({
        ...prevState,
        [postId]: !prevState[postId],
      }));
    }
  };

  return (
    <div>
      <MainLayout>
        <div className="flex flex-wrap justify-center gap-4 min-h-screen pt-28 flex-col">
          {videoPosts && videoPosts.length === 0 ? (
            <p className="text-white">No video posts available</p>
          ) : (
            videoPosts.map((post: Post) => (
              <div
                key={post._id}
                className="relative h-[600px] w-[300px] overflow-hidden mb-8 mx-auto bg-black rounded-lg "
              >
                {/* Video Section */}
                <div className="video-container relative flex items-center justify-center h-[550px] w-full ">
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[post._id] = el;
                      }
                    }}
                    className="w-auto h-auto object-cover"
                    muted={muted}
                    controls={false}
                    onClick={() => togglePlay(post._id)}
                  >
                    <source src={post.content} />
                    Your browser does not support the video tag.
                  </video>

                  {/* Mute/Unmute Button */}
                  <div
                    className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full text-white cursor-pointer "
                    onClick={toggleMute}
                  >
                    {muted ? "🔇" : "🔊"}
                  </div>
                </div>

                {/* Interaction Buttons */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
                  {/* Like Button */}
                  <button
                    className="text-white text-xl flex flex-col items-center"
                    onClick={() => handleLike(post._id)}
                  >
                    {likes[post._id] ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span className="block text-xs">{post.likes.length}</span>
                  </button>

                  {/* Comment Button */}
                  <button className="text-white text-xl flex flex-col items-center">
                    <FaComment />
                    <span className="block text-xs">{post.comments.length}</span>
                  </button>

                  {/* Save Button */}
                  <button
                    className="text-white text-xl"
                    onClick={() => handleSave(post._id)}
                  >
                    <FaSave />
                  </button>

                  {/* Share Button */}
                  <button
                    className="text-white text-xl"
                    onClick={() => handleShare(post._id)}
                  >
                    <FaPaperPlane />
                  </button>
                </div>

                {/* Video Description and User Details at Bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.author.profileImage}
                      alt={post.author.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold">
                      {post.author.userName}
                    </span>
                  </div>
                  <h3 className="text-sm mt-2">{post.description}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default React.memo(() => {
  return <VideoPosts />;
});
