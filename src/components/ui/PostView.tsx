/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from "react";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation"; // Adjusted to `next/navigation` for the latest Next.js version
import { FaUserCircle } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
// import CommentModal from "@/components/modals/commentModal";

interface Comment {
  _id:string
  author: {  userName: string; profileImage: string };
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
  author: { _id: string, profileImage:string, userName:string};
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
}

const PostView: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const router = useRouter();
  const {
    
    description,
    image,
    likes,
    createdAt,
    _id,
    author,
    comments,
  } = post;

  
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const handleProfile = (id: string) => {
      router.push(`/profile/${id === currentUserId ? currentUserId : id}`);
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
  <div className="flex mb-2 items-center gap-1 cursor-pointer" onClick={() => handleProfile(author?._id)}>
    {author?.profileImage ? (
      <img
     
       src={author.profileImage} 
       alt="Profile" 
       className="w-8 h-8 rounded-full" />
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
              onClick={() => setIsLiked((prev) => !prev)}
            />
          ) : (
            <FaRegHeart
              className="text-2xl cursor-pointer hover:text-red-500"
              onClick={() => setIsLiked((prev) => !prev)}
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

      {/* Comments Section */}
      <div className="px-4 pb-4">
        <h3
          className="text-sm text-gray-400 cursor-pointer"
          onClick={toggleModal}
        >
          {commentsList.length
            ? `View all ${commentsList.length} comments`
            : "No comments yet"}
        </h3>
      </div>

      {/* Add Comment */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 px-4 pb-2"
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-[#1a1c26] text-sm text-white px-3 py-1 w-full rounded"
        />
        <button type="button" className="text-sm text-blue-500 hover:underline">
          Post
        </button>
      </form>

      {/* Comment Modal */}
      {/* <CommentModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        comments={commentsList}
        postUserName={userName}
        profileImage={profileImage}
      /> */}
    </div>
  );
};

export default PostView;