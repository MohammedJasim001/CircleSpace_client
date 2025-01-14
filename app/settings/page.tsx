/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button/Button";
import React from "react";

const Settings = () => {
  return (
    <div className="pt-24 pr-32 text-white  min-h-screen mb-3">
      {/* Edit Profile Header */}
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {/* Profile Info */}
      <div className="bg-[#272932] p-6 rounded-lg flex items-center mb-8">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-6"
        />
        <div>
          <h2 className="text-xl font-semibold">Edwerd Evans</h2>
          <p className="text-gray-400">@evans99</p>
        </div>
        <div className="ml-auto">
          <Button text="Change Photo" />
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Bio</h2>
        <textarea
          className="bg-[#272932] text-white rounded-lg w-full p-4 h-24"
          placeholder="Write something about yourself..."
        ></textarea>
      </div>

      {/* Gender Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Gender</h2>
        <select className="bg-[#272932] text-white rounded-lg w-full p-3">
          <option value="">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <p className="text-gray-500 mt-2 text-sm">
          This won&lsquo;t be part of your public profile.
        </p>
      </div>

      {/* Show Account Suggestions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Show account suggestions</h2>
        <div className="flex items-center justify-between bg-[#272932] p-4 rounded-lg">
          <p>Show account suggestions on profiles</p>
          <input type="checkbox" className="toggle-checkbox" />
        </div>
        <p className="text-gray-500 mt-2 text-sm">
          Choose whether people can see similar account suggestions on your
          profile, and whether your account can be suggested on other profiles.
        </p>
      </div>

      {/* Submit Button */}
      <Button text="submit" />
    </div>
  );
};

export default Settings;
