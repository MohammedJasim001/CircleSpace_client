/* eslint-disable @next/next/no-img-element */
import useComment from "@/hooks/useComment";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

interface Comment {
  _id: string;
  author: { _id: string; userName: string; profileImage: string };
  content: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  postUserName: string;
  profileImage: string;
  postId: string;
  currentUserId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comments,
  postUserName,
  profileImage,
  postId,
  currentUserId,
}) => {
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);
  const { mutate: addComment } = useComment(postId);

  // Update the local comments list when the comments prop changes
  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  if (!isOpen) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    // Optimistic UI Update
    const optimisticComment: Comment = {
      _id: "temp-id", // Temporary ID for optimistic update
      author: {
        _id: currentUserId,
        userName: "You",
        profileImage: "", // Placeholder, if user has a profile image, set it here
      },
      content: newComment,
    };

    setCommentsList((prevComments) => [...prevComments, optimisticComment]);

    addComment(
      { postId: postId, authorId: currentUserId, content: newComment },
      {
        onSuccess: (response: { data: Comment }) => {
          // Replace optimistic comment with the real one after successful API response
          setCommentsList((prev) =>
            prev.map((comment) =>
              comment._id === "temp-id" ? response.data : comment
            )
          );
          setNewComment(""); // Clear input
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg md:w-[40%] md:h-[60%] max-h-[80vh] relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          X
        </button>

        {/* Post User Details */}
        <div className="flex items-center gap-2 mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt={postUserName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-3xl" />
          )}
          <p className="text-sm text-gray-300">{postUserName}</p>
        </div>

        <hr />
        {comments.length == 0 && <div className="mt-3">No comments yet</div>}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-4">
          {commentsList.map((comment) => (
            <div key={comment._id} className="flex items-center gap-2">
              {comment.author.profileImage ? (
                <img
                  src={comment.author.profileImage}
                  alt={comment.author.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-3xl" />
              )}
              <div>
                <p className="text-sm text-gray-300">
                  {comment.author.userName}
                </p>
                <p className="text-sm text-gray-400">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Input Box */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center gap-2 "
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
