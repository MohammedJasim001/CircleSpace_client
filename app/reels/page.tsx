/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import useReels from "@/hooks/useReels";
import useLike from "@/hooks/useLikes";
import MainLayout from "@/layout/mainLayout";
import { getUserId } from "@/utils/userDetails";
import { FaHeart, FaRegHeart, FaComment, FaPaperPlane, FaSave } from "react-icons/fa";
import CommentModal from "@/components/modals/CommentModal";
import ReelSkelton from "@/components/skeltons/reelSkelton";

interface Comment {
  _id: string;
  author: { _id: string; userName: string; profileImage: string };
  content: string;
}

interface Post {
  _id: string;
  content: string;
  description: string;
  likes: string[];  
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  author: { _id: string; profileImage: string; userName: string };
}

const VideoPosts = () => {
  const { data: videoPosts, isLoading, isError, error } = useReels();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const [isLiked, setIsLiked] = useState<{ [key: string]: boolean }>({});
  const [muted, setMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { mutate: toggleLike } = useLike();

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getUserId();
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  useEffect(() => {
    if (videoPosts && currentUserId) {
      const initialLikeState: { [key: string]: boolean } = {};
      const initialLikeCounts: { [key: string]: number } = {};

      videoPosts.forEach((post:Post) => {
        const userHasLiked = post.likes.includes(currentUserId);
        initialLikeState[post._id] = userHasLiked;
        initialLikeCounts[post._id] = post.likes.length;
      });

      setIsLiked(initialLikeState);
      setLikeCounts(initialLikeCounts);
    }
  }, [videoPosts, currentUserId]);

  if (isLoading) return <ReelSkelton/>
  if (isError) return <div>Error: {error?.message}</div>;

  const handleLikeToggle = (postId: string) => {
    toggleLike(
      { userId: currentUserId || "", postId: postId },
      {
        onSuccess: () => {
          const updatedLikeState = { ...isLiked };
          const updatedLikeCounts = { ...likeCounts };

          updatedLikeState[postId] = !updatedLikeState[postId];

          if (updatedLikeState[postId]) {
            updatedLikeCounts[postId] += 1;
          } else {
            updatedLikeCounts[postId] -= 1;
          }

          setIsLiked(updatedLikeState);
          setLikeCounts(updatedLikeCounts);
        },
      }
    );
  };

  const toggleMute = () => {
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

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <MainLayout>
        <div className="flex flex-wrap justify-center gap-4 min-h-screen pt-20 sm:pt-28 flex-col md:mr-44">
          {videoPosts && videoPosts.length === 0 ? (
            <p className="text-white">No video posts available</p>
          ) : (
            videoPosts.map((post: Post) => (
              <div
                key={post._id}
                className="relative h-[550px] w-full] sm:w-[300px] overflow-hidden mb-14 mx-auto bg-black sm:rounded-lg "
              >
                <div className="video-container relative flex items-center justify-center h-[500px] w-full">
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

                  <div
                    className="absolute bottom-8 right-4 bg-gray-800 p-4 rounded-full text-white cursor-pointer flex items-center justify-center w-12 h-12"
                    onClick={toggleMute}
                  >
                    <span className="text-xl">{muted ? "🔇" : "🔊"}</span>
                  </div>
                </div>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
                  <div>
                    {isLiked[post._id] ? (
                      <FaHeart
                        className="text-2xl cursor-pointer text-red-500"
                        onClick={() => handleLikeToggle(post._id)}
                      />
                    ) : (
                      <FaRegHeart
                        className="text-2xl cursor-pointer hover:text-red-500"
                        onClick={() => handleLikeToggle(post._id)}
                      />
                    )}
                    <span className="block text-xs text-center">
                      {likeCounts[post._id]}
                    </span>
                  </div>
                  <button
                    className="text-white text-xl flex flex-col items-center"
                    onClick={() => openModal(post)}
                  >
                    <FaComment />
                    <span className="block text-xs">{post.comments.length}</span>
                  </button>
                  <button
                    className="text-white text-xl"
                    onClick={() => handleSave(post._id)}
                  >
                    <FaSave />
                  </button>
                  <button
                    className="text-white text-xl"
                    onClick={() => handleShare(post._id)}
                  >
                    <FaPaperPlane />
                  </button>
                </div>

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

        {selectedPost && (
          <CommentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            comments={selectedPost.comments}
            postUserName={selectedPost.author.userName}
            profileImage={selectedPost.author.profileImage}
            postId={selectedPost._id}
            currentUserId={currentUserId || ""}
          />
        )}
      </MainLayout>
    </div>
  );
};

export default React.memo(VideoPosts);
