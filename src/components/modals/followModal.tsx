import React from "react";
import { FaTimes } from "react-icons/fa";

interface User {
  userName: string;
  _id: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  users: User[];
  followingIds: string[]; 
  currentUserId: string; 
  onFollowToggle: (userId: string) => void; // Function to handle follow/unfollow
}

const FollowListModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  title,
  users,
  followingIds,
  currentUserId,
  onFollowToggle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black text-white p-6 rounded-lg w-96 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-lg"
          onClick={closeModal}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* User List */}
        <ul className="space-y-4">
          {users.length === 0 ? (
            <li className="text-gray-300">No users found</li>
          ) : (
            users.map((user) => {
              const isFollowing = followingIds.includes(user._id);
              return (
                <li
                  key={user._id}
                  className="flex justify-between items-center text-sm text-gray-300"
                >
                  <span className="font-medium">
                    {/* Show 'You' for the current user, otherwise show the username */}
                    { user.userName}
                  </span>

                  {/* Show 'Follow' or 'Following' button for others */}
                  {user._id !== currentUserId ? (
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-semibold ${
                        isFollowing
                          ? "bg-gray-500 text-white"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                      onClick={() => onFollowToggle(user._id)}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  ):<div className='px-4 py-2 rounded-md text-sm font-semibold bg-slate-500'>you</div>}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default FollowListModal;
