/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { toast } from "react-toastify";
import useLike from "@/hooks/useLikes";
import useComment from "@/hooks/useComment";
import CommentModal from "../modals/CommentModal";
import useSave from "@/hooks/useSave";
import { useProfile } from "@/hooks/useProfile";
import EmojiPickerWrapper from "../EmojiPicker/EmojiPicker";

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
  const videoExtensions = [".mp4", ".webm", ".ogg"];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const isImage = (url: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const PostView: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const router = useRouter();
  const { description, content, likes, createdAt, _id, author, comments } =
    post;

  const [isLiked, setIsLiked] = useState<boolean>(
    likes.includes(currentUserId)
  );
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);
  const [showPicker, setShowPicker] = useState(false);

  const { data, refetch } = useProfile(currentUserId);
  const { mutate: toggleLike } = useLike();
  const { mutate: addComment } = useComment(_id);
  const { mutate: savePost } = useSave();

  const userSavedPosts = data?.data?.savedPosts?.map(
    (ele: { _id: string }) => ele._id
  );

  useEffect(() => {
    if (userSavedPosts && _id) {
      setIsSaved(userSavedPosts.includes(_id));
    }
  }, [userSavedPosts, _id]);

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
          setShowPicker(false)
        },
      }
    );
  };

  const handleSaveToggle = (id: string) => {
    console.log(isSaved, "isSaved");
    savePost(
      { userId: currentUserId, postId: id },
      {
        onSuccess: () => {
          refetch();
          setIsSaved((prev) => !prev);
          toast.success(isSaved ? "Post unsaved" : "Post saved");
        },
        onError: () => {
          toast.error("Something went wrong while saving the post");
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

  const handleAddEmoji = (emoji: string) => {
    setNewComment((prev) => prev + emoji);
  };

  return (
    <div className=" lg:w-[35vw] sm:ml-32 lg:ml-60 text-white rounded-lg shadow-lg overflow-hidden mb-9">
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
          className="w-full object-contain rounded-t-lg max-h-[500px]"
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
        {isSaved ? (
          <MdBookmark
            className="text-2xl cursor-pointer hover:text-white"
            onClick={() => handleSaveToggle(_id)}
          />
        ) : (
          <MdBookmarkBorder
            className="text-2xl cursor-pointer hover:text-white"
            onClick={() => handleSaveToggle(_id)}
          />
        )}
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
          {commentsList.length === 0
            ? "No Comments"
            : commentsList.length === 1
            ? "View 1 Comment"
            : `View all ${commentsList.length} Comments`}
        </div>
      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center gap-2 px-4 pb-2 bottom-3"
      >
        <EmojiPickerWrapper
          onSelectEmoji={handleAddEmoji}
          position="absolute bottom-5 -left-4 sm:left-38"
          size="sm"
          isOpen={showPicker}
          setIsOpen={setShowPicker}
          iconPosition="absolute -bottom-2 left-3"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-[#1a1c26] text-sm text-white px-3 py-1 w-full rounded pl-7"
        />
        <button type="submit" className={`text-sm text-blue-500 hover:underline`}>
          Post
        </button>
      </form>

      <CommentModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        comments={commentsList}
        postUserName={author.userName}
        profileImage={author.profileImage}
        postId={_id}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default PostView;
