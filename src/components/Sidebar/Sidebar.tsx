/* eslint-disable @next/next/no-img-element */
"use client"; // Ensure it's a client-side component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaRegBell, FaVideo } from "react-icons/fa";
import { BiMessageDetail,  } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import Link from "next/link";
import { getUserId, userDetails } from "@/utils/userDetails";

interface UserProfile {
  name?: string;
  email?: string;
  profileImage?:string;
  userName?:string
}

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current path using usePathname
  const [isClient, setIsClient] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userProfile,setUserProfile] = useState<UserProfile |null>({});


  useEffect(() => {
    setIsClient(true); 
  }, []);

   useEffect(() => {
        const fetchCurrentUserId = async () => {
          try {
            const userId = await getUserId();
            const user = await userDetails()
            setUserProfile(user)
            setCurrentUserId(userId);
          } catch (error) {
            console.error("Error fetching user ID:", error);
          }
        };
    
        fetchCurrentUserId();
      }, []);

  if (!isClient) {
    return null; 
  }

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="w-28 bg-[#272932] text-white min-h-screen p-4 flex flex-col items-center fixed z-20">
      <h2 className="mt-5 font-serif mb-6 flex items-center gap-2">GameSphere</h2>
      <ul className="flex flex-col items-center gap-9 w-full mt-10">
        {/* Top Section */}
        <li className="relative group">
          <Link
            href="/"
            passHref
            className={`block ${
              isActive("/") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            } hover:text-[#6a3aba]`}
          >
            <GoHomeFill className="w-6 h-6" />
          </Link>
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
            Home
          </span>
        </li>

        {/* Other links with dynamic icons */}
        <li>
          <Link
            href="/search"
            passHref
            className={`block ${
              isActive("/search") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <FaSearch className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link
            href="/reels"
            passHref
            className={`block ${
              isActive("/reels") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <FaVideo className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link
            href="/messages"
            passHref
            className={`block ${
              isActive("/messages") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <BiMessageDetail className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link
            href="/notifications"
            passHref
            className={`block ${
              isActive("/notifications") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <FaRegBell className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link
            href="/createpost"
            passHref
            className={`block ${
              isActive("/createpost") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <MdPostAdd className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link
            href={`/${currentUserId}`}
            passHref
            className={`block  ${
              isActive("/profile") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <img src={userProfile?.profileImage} alt={userProfile?.userName} className="w-7 h-7 rounded-full" />
          </Link>
        </li>

        {/* Divider */}
        <hr className="w-full border-gray-500 mt-14" />

        {/* Bottom Section */}
        <li>
          <Link
            href="/settings"
            passHref
            className={`block ${
              isActive("/settings") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <IoSettings className="w-6 h-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
