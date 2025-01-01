/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

interface FollowListModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  users: { userName: string; _id: string; profileImage: string; followers: { _id: string }[] }[]; 
  currentUserId: string;
  handleFollow: (targetId: string) => void;
}

const FollowListModal: React.FC<FollowListModalProps> = ({
  isOpen,
  closeModal,
  title,
  users,
  currentUserId,
  handleFollow
}) => {
  const [updatedUsers, setUpdatedUsers] = useState(users);

  useEffect(() => {
    setUpdatedUsers(users);
  }, [users]); // Update local state when users prop changes

  const updateUserFollowStatus = (targetId: string) => {
    setUpdatedUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user._id === targetId
          ? {
              ...user,
              followers: user.followers.some(
                (follower) => follower._id === currentUserId
              )
                ? user.followers.filter(
                    (follower) => follower._id !== currentUserId
                  )
                : [...user.followers, { _id: currentUserId }]
            }
          : user
      );
    });
  };

  const handleFollowClick = (userId: string) => {
    handleFollow(userId); // Call the parent function to handle the follow/unfollow action
    updateUserFollowStatus(userId); // Immediately update the user list in the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black rounded-lg w-80 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={closeModal} className="text-gray-500">X</button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {updatedUsers.map((user) => (
            <div key={user._id} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.userName}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    <span>{user.userName}</span>
                  </div>
                )}
                <span className="text-lg">{user.userName}</span>
              </div>
              <div>
                {user._id !== currentUserId ?
                  <Button
                    text={
                      user?.followers?.some(
                        (follower) => String(follower._id) === String(currentUserId)
                      )
                        ? "Following"
                        : "Follow"
                    }
                    onClick={() => handleFollowClick(user._id)}
                  />
                  :
                  <div>You</div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowListModal;
