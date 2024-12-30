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
  image: string;
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

const PostView: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const router = useRouter();
  const { description, image, likes, createdAt, _id, author, comments } = post;

  const [isLiked, setIsLiked] = useState<boolean>(
    likes.includes(currentUserId)
  );
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments); // Track updated comments

  const { mutate: toggleLike } = useLike();
  const { mutate: addComment } = useComment();

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
          setCommentsList((prev) => [...prev, response.data]); // Add new comment to the list
          setNewComment(""); // Clear input field after successful comment
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
    <div className="max-w-2xl ml-40 text-white rounded-lg shadow-lg overflow-hidden mb-6">
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

      {/* Image Section */}
      <img
        alt="Post Image"
        src={image}
        className="w-full h-auto object-contain rounded-t-lg"
      />

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
        comments={commentsList} // Use updated list of comments
        postUserName={author.userName}
        profileImage={author.profileImage}
      />
    </div>
  );
};

export default PostView;
