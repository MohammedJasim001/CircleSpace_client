'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const AccountPrivacy = () => {

  const router = useRouter()

  return (
    <div className="sm:pt-10 flex justify-center sm:pr-32">
      <div className=" p-6 rounded-lg  w-full">
        {/* Title */}
        <div className="flex items-center">
              <IoArrowBack className="sm:hidden text-xl" onClick={()=>router.back()}/>
              <h1 className="text-xl sm:text-3xl font-bold ml-3 sm:ml-0">Acount and Privacy</h1>
              </div>

        {/* Privacy Section */}
        <div className="border border-gray-700  p-5 rounded-lg flex gap-2 mt-5">
          <div>
          <h3 className="text-lg font-medium mb-4">Private account</h3>
          <p className="text-gray-400 mb-2">
            When your account is public, your profile and posts can be seen by anyone, on or off the platform, even if they don’t have an account.
          </p>
          <p className="text-gray-400">
            When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages. Your followers and following lists, as well as your profile picture and username, remain visible to everyone on and off the platform.
          </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between mt-4 ">
            <span className="text-white"></span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5D60EF]"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPrivacy;
