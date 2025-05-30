/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Button from "../Button/Button";
import { FaUser } from "react-icons/fa6";
import useFollow from "@/hooks/useFollow";
import FollowListModal from "../modals/followModal";
import { User } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";



interface ProfileProps {
  userId: string;
  currentUserId: string;
  userDetails: User;
  onRefetch: () => void;
}

interface UserSummary {
  userName: string;
  _id: string;
  profileImage: string;
  followers: { _id: string }[];
}

const ProfilePage: React.FC<ProfileProps> = ({
  userId,
  currentUserId,
  userDetails,
  onRefetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<UserSummary[]>([]);
  const followMutation = useFollow();

  const router = useRouter()
  const pathname = usePathname()

  const handleMessage = (userId:string)=>{
    router.push(`messages/${userId}`)
  }

  // Handle Follow/Unfollow
  const handleFollow = (targetId: string) => {
    followMutation.mutate(
      { userId: currentUserId, targetId },
      {
        onSuccess: () => {
          onRefetch();
        },
      }
    );
  };

  
  // Open the modal for followers or following list
  const openModal = (type: "followers" | "following") => {
    setModalTitle(type === "followers" ? "Followers" : "Following");
    setModalData(
      type === "followers" ? userDetails.followers : userDetails.following
    );
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-white  sm:py-5 sm:mr-40 pt-14 sm:pt-24 sm:ml-32">
      <div className="relative bg-[#6f30d8] h-40 rounded-lg">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
          {userDetails?.profileImage ? (
            <img
              src={userDetails?.profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#0f0f17]"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-[#0f0f17] bg-gray-300 flex items-center justify-center text-3xl text-gray-700">
              <FaUser />
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 text-center">
        <h1 className="text-2xl font-bold">{userDetails?.name}</h1>
        <p className="text-gray-400">@{userDetails?.userName}</p>
        <p className="text-gray-300 max-w-lg mx-auto mt-2">
          {userDetails?.bio}
        </p>

        <div className="flex justify-center gap-8 mt-6">
          <div>
            <p className="text-lg font-semibold">
              {userDetails?.posts?.length}
            </p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div onClick={() => openModal("followers")}>
            <p className="text-lg font-semibold">
              {userDetails?.followers?.length}
            </p>
            <p className="text-gray-400">Followers</p>
          </div>
          <div onClick={() => openModal("following")}>
            <p className="text-lg font-semibold">
              {userDetails?.following?.length}
            </p>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          {currentUserId && userId && userId !== currentUserId ? (
            <div className="flex gap-4">
              <Button
                text={
                  userDetails?.followers?.some(
                    (follower) => String(follower._id) === String(currentUserId) // Ensure both are strings
                  )
                    ? "Following"
                    : "Follow"
                }
                onClick={() => handleFollow(userId)}
              />

              <Button text="Message" onClick={()=>handleMessage(userDetails?._id)}/>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button text="Edit Profile" onClick={()=>router.push('/settings/editProfile')}/>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 px-2 sm:px-6">
        <div className="flex border-b-2 border-gray-700 ">
          <button
            onClick={() => router.push(`/${userId}`)}
            className={`px-4 py-2 ${
              pathname === `/${userId}`
                ? "text-white border-b-2 border-[#6f30d8]"
                : "text-gray-400"
            }`}
          >
            POSTS
          </button>
          <button
            onClick={() => router.push(`/${userId}/saved`)}
            className={`px-4 py-2 ${
              pathname === `/${userId}/saved`
                ? "text-white border-b-2 border-[#6f30d8]"
                : "text-gray-400"
            }`}
          >
            SAVED
          </button>
        </div>
      </div>

     

      {/* Modal */}
      <FollowListModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={modalTitle}
        users={modalData} // Pass only the user details without follow/unfollow logic
        currentUserId={currentUserId}
        handleFollow={handleFollow}
      />
    </div>
  );
};

export default ProfilePage;
