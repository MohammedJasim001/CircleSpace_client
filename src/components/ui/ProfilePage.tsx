/* eslint-disable @next/next/no-img-element */
// ProfilePage.tsx
"use client"

import React, { useState } from "react";
import { FaCoins, FaUser } from "react-icons/fa";
import Image from "next/image";
import Button from "../Button/Button";

interface User {
  profileImage: string;
  name: string;
  userName: string;
  bio: string;
  posts: { image: string }[];
  followers: { userName: string; _id: string }[];
  following: { userName: string; _id: string }[];
  coins: number;
  _id: string;
}

interface ProfileProps {
  userId: string;
  currentUserId: string;
  userDetails: User;
}

const ProfilePage: React.FC<ProfileProps> = ({ userId, currentUserId, userDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<{ userName: string; _id: string }[]>([]);
  const [currentFollowingIds, setCurrentFollowingIds] = useState<string[]>([]);


  // Set following IDs on component mount
  React.useEffect(() => {
    setCurrentFollowingIds(userDetails?.following?.map((ele) => ele._id));
  }, [userDetails]);

  // Handle follow toggle logic
  const handleFollowToggle = async (followUserId: string) => {
    console.log(followUserId);
    // Implement follow/unfollow logic
  };

  console.log(userDetails,'userdetails');

  // Open the modal for followers or following list
  const openModal = (type: "followers" | "following") => {
    setModalTitle(type === "followers" ? "Followers" : "Following");
    setModalData(type === "followers" ? userDetails?.followers || [] : userDetails?.following || []);
    setIsModalOpen(true);
  };

  return (
    <div className="text-white ml-44 mt-5 w-[]">
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
        <p className="text-gray-300 max-w-lg mx-auto mt-2">{userDetails?.bio}</p>

        <div className="flex justify-center gap-8 mt-6">
          <div>
            <p className="text-lg font-semibold">{userDetails?.posts?.length}</p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div onClick={() => openModal("followers")}>
            <p className="text-lg font-semibold">{userDetails?.followers?.length}</p>
            <p className="text-gray-400">Followers</p>
          </div>
          <div onClick={() => openModal("following")}>
            <p className="text-lg font-semibold">{userDetails?.following?.length}</p>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          {currentUserId && userId && userId !== currentUserId ? (
            <div className="flex gap-4">
              <Button
                text={currentFollowingIds.includes(userId) ? "Following" : "Follow"}
                onClick={() => handleFollowToggle(userId)}
              />
              <Button text="Message" />
            </div>
          ) : (
            <div className="flex gap-4">
              <Button text="Edit Profile" />
            </div>
          )}
        </div>
      </div>


      <div className="mt-10 px-6">
        <div className="flex border-b-2 border-gray-700">
          <button className="text-white px-4 py-2 border-b-2 border-[#6f30d8]">POSTS</button>
          <button className="text-gray-400 px-4 py-2">SAVED</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-6">
        {userDetails?.posts?.map((post, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={`Post ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
