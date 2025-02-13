"use client";

/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button/Button";
import { useEditProfile, useProfile } from "@/hooks/useProfile";
import { getUserId } from "@/utils/userDetails";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const { mutate: editProfile, isPending } = useEditProfile();
  
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  const { data: userProfile } = useProfile(currentUserId );

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getUserId();
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    
    fetchCurrentUserId();
  }, []);

  useEffect(() => {
    if (userProfile?.data) {
      setName(userProfile.data.name);
      setUserName(userProfile.data.userName);
      setBio(userProfile.data.bio);
    }
  }, [userProfile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };

  const handleProfileUpdate = async () => {

    if (!currentUserId) {
      console.log("User ID is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("userName", userName);
    formData.append("bio", bio);
    if (selectedFile) {
      formData.append("media", selectedFile);
    }

    editProfile({ formData, currentUserId });
  };

  return (
    <div className="pt-24 pr-32 text-white min-h-screen mb-3">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {/* Profile Info */}
      <div className="bg-[#272932] p-6 rounded-lg flex items-center justify-between mb-8">
        <div className="flex items-center">
          <img
            src={selectedImage || userProfile?.data?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-6"
          />
          <div>
            <h2 className="text-xl font-semibold">{userProfile?.data?.name}</h2>
            <p className="text-gray-400">{userProfile?.data?.userName}</p>
          </div>
        </div>
        <div>
  <input 
    type="file" 
    accept="image/*" 
    id="profileUpload" 
    className="hidden" 
    onChange={handleImageChange} 
  />
  <label 
    htmlFor="profileUpload" 
    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
  >
    Change Photo
  </label>
</div>

      </div>

      {/* Name Input */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Name</h2>
        <input
          className="bg-[#272932] text-white rounded-lg w-full p-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      {/* Username Input */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Username</h2>
        <input
          className="bg-[#272932] text-white rounded-lg w-full p-4"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Bio</h2>
        <textarea
          className="bg-[#272932] text-white rounded-lg w-full p-4 h-24"
          placeholder="Write something about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>

      {/* Submit Button */}
      <Button text={isPending ? "Saving..." : "Save Changes"} onClick={handleProfileUpdate} />
    </div>
  );
};

export default Settings;
