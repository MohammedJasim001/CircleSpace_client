/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
import { toast } from "react-toastify";
import useLike from "@/hooks/useLikes";
import useComment from "@/hooks/useComment";
import CommentModal from "../modals/CommentModal";

interface Comment {
  _id: string;
  author: { _id: string; userName: string; profileImage: string };
  content: string;
}

interface Post {
  _id: string;
  content: string; // Video or image URL
  description: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  author: { _id: string; profileImage: string; userName: string };
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
}

// Utility functions to check file type
const isVideo = (url: string) => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const isImage = (url: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const PostView: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const router = useRouter();
  const { description, content, likes, createdAt, _id, author, comments } = post;

  // Hooks must always be called, even if the post type is invalid
  const [isLiked, setIsLiked] = useState<boolean>(likes.includes(currentUserId));
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);

  const { mutate: toggleLike } = useLike();
  const { mutate: addComment } = useComment();

  // Skip rendering invalid posts
  if (!isVideo(content) && !isImage(content)) {
    return null;
  }

  const handleLikeToggle = () => {
    toggleLike(
      { userId: currentUserId, postId: _id },
      {
        onSuccess: () => {
          setIsLiked((prev) => !prev);
          setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        },
        onError: () => {
          toast.error("Failed to update Like status!");
        },
      }
    );
  };

  const handleProfile = (id: string) => {
    router.push(`/${id}`);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    addComment(
      { postId: _id, authorId: currentUserId, content: newComment },
      {
        onSuccess: (response: { data: Comment }) => {
          setCommentsList((prev) => [...prev, response.data]);
          setNewComment("");
        },
        onError: () => {
          toast.error("Failed to add comment!");
        },
      }
    );
  };

  const formattedTimestamp = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="max-w-md ml-60 text-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div
          className="flex mb-2 items-center gap-1 cursor-pointer"
          onClick={() => handleProfile(author?._id)}
        >
          {author?.profileImage ? (
            <img
              src={author.profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUserCircle className="text-2xl" />
          )}
          <p className="text-sm text-gray-400">{author.userName} •</p>
          <p className="text-sm text-gray-500">{formattedTimestamp}</p>
        </div>
        <div>•••</div>
      </div>

      {/* Media Section */}
      {isVideo(content) ? (
        <video
          controls
          src={content}
          className="w-full h-auto max-h-[500px] object-contain rounded-t-lg"
        ></video>
      ) : (
        <img
          src={content}
          alt="Post Media"
          className="w-full h-auto object-contain rounded-t-lg"
        />
      )}

      {/* Action Icons */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3">
          {isLiked ? (
            <FaHeart
              className="text-2xl cursor-pointer text-red-500"
              onClick={handleLikeToggle}
            />
          ) : (
            <FaRegHeart
              className="text-2xl cursor-pointer hover:text-red-500"
              onClick={handleLikeToggle}
            />
          )}
          <FaRegComment
            className="text-2xl cursor-pointer hover:text-white"
            onClick={toggleModal}
          />
          <FiSend className="text-2xl cursor-pointer hover:text-white" />
        </div>
        <MdBookmarkBorder className="text-2xl cursor-pointer hover:text-white" />
      </div>

      {/* Like & Description */}
      <div className="px-4 pb-2">
        <div className="text-sm text-gray-400">{likeCount} likes</div>
        <div className="flex items-center gap-2 mt-2">
          <p>{author.userName}</p>
          <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
        </div>
      </div>

      {/* Comment Count */}
      <div className="px-4 pb-2">
        <div
          className="text-sm text-gray-400 cursor-pointer"
          onClick={toggleModal}
        >
          {comments.length === 0
            ? "No Comments"
            : comments.length === 1
            ? "View 1 Comment"
            : `View all ${comments.length} Comments`}
        </div>
      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center gap-2 px-4 pb-2"
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-[#1a1c26] text-sm text-white px-3 py-1 w-full rounded"
        />
        <button type="submit" className="text-sm text-blue-500 hover:underline">
          Post
        </button>
      </form>

      <CommentModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        comments={commentsList}
        postUserName={author.userName}
        profileImage={author.profileImage}
      />
    </div>
  );
};

export default PostView;
