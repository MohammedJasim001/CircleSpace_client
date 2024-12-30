/* eslint-disable @next/next/no-img-element */
// components/CommentModal.tsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface Comment {
    _id:string
  author: { _id: string; userName: string; profileImage: string };
  content: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  postUserName: string;
  profileImage: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comments,
  postUserName,
  profileImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[40%] h-[60%] max-h-[80vh] overflow-y-auto relative ">
        <div className="">
          <div className="w-2/3">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={postUserName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-gray-400 text-3xl" /> // User icon if no profile image
                )}
                <p className="text-sm text-gray-300">{postUserName}</p>
              </div>

              <div>•••</div>
            </div>

            <hr />

            <div className="flex flex-col">
              <div className="space-y-4 mt-5">
                {comments.map((comment, index) => (
                  <div key={index} className="mb-2 gap-2">
                    {/* Conditionally render profile image or user icon */}
                    <div className="flex items-center gap-2">
                      {comment?.author?.profileImage ? (
                        <img
                          src={comment?.author?.profileImage}
                          alt={comment?.author?.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-gray-400 text-3xl" /> // User icon if no profile image
                      )}
                      <p className="text-sm text-gray-300">
                        {comment?.author?.userName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {comment?.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
          <div className="w-1/3">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-white text-2xl "
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
