"use client"; // Ensure it's a client-side component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { GoHomeFill } from "react-icons/go";
import { BiMessageDetail,  } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import Link from "next/link";


const Footer: React.FC = () => {
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
    <footer className=" w-full h-14 bg-[#272932] text-white py-4 flex items-center -bottom-1.5 fixed z-50 ">
      <ul className="flex items-center justify-around w-full mb-3">
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
    </footer>
  );
};

export default Footer;
