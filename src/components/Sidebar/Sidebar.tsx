"use client"; // Ensure it's a client-side component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { GoHomeFill } from "react-icons/go";
import { BiMessageDetail,  } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";


const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current path using usePathname
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true); 
  }, []);


  if (!isClient) {
    return null; 
  }

  const isActive = (path: string) => {
    if (path === "/messages" && pathname.startsWith("/messages")) {
      return true;
    }
    if (path === '/settings' && pathname.startsWith('/settings')) {
      return true
    }
    return pathname === path;
  };

  return (
    <div className="w-28 bg-[#272932] text-white min-h-screen py-4 flex flex-col items-center fixed z-20">
      <Image
        width={200}
        height={200}
        src={'/images/logoName.png'}
        alt="appLogo"
        className=" w-full h-20 mt-10"
      />
      <ul className="flex flex-col items-center gap-10 w-full mt-16">
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

        <li>
          <Link
            href="/reels"
            passHref
            className={`block ${
              isActive("/reels") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <BiMoviePlay className="w-6 h-6" />
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
            href="/createpost"
            passHref
            className={`block ${
              isActive("/createpost") ? "text-[#6a3aba]" : "text-[#8F8F8F]"
            }`}
          >
            <MdPostAdd className="w-6 h-6" />
          </Link>
        </li>
       

        {/* Divider */}
        <hr className="w-full border-gray-500 mt-14" />

        {/* Bottom Section */}
        <li>
          <Link
            href="/settings/editProfile"
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
