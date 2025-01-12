"use client"; // Ensure it's a client-side component

import { MdBlockFlipped } from "react-icons/md";
import { IoLogOutSharp, IoNotificationsOffSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import MainLayout from "@/layout/mainLayout";
import { FaLock } from "react-icons/fa6";

type SettingsLayoutProps = {
  children: React.ReactNode;
};


const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {


  return (
    <MainLayout>
    <div className="w-56  text-white min-h-screen p-4 flex flex-col items-center fixed border-r border-gray-500">
      <h2 className="mt-5 font-serif mb-6 flex items-center gap-2">CircleSpace</h2>
      <ul className="flex flex-col  gap-5 w-full mt-20 ">
        {/* Top Section */}
        <li className=" flex gap-3 cursor-pointer hover:bg-black w-full h-12 rounded-lg items-center pl-3">
          
           <FaRegUserCircle  className="w-6 h-6 text-[#8F8F8F]" />
            <p>Edit Profile</p>
        </li>

        <li className="flex  gap-3 cursor-pointer hover:bg-black w-full h-12 rounded-lg items-center pl-3">
            <FaLock className="w-6 h-6 text-[#8F8F8F]" />
            <p>Account Privacy</p>
        </li>
        <li className="flex gap-3 cursor-pointer hover:bg-black w-full h-12 rounded-lg items-center pl-3">
        
            <MdBlockFlipped className="w-6 h-6 text-[#8F8F8F]" />
            <p>Blocked</p>
        </li>
        <li className="flex gap-3 cursor-pointer hover:bg-black w-full h-12 rounded-lg items-center pl-3">
          
            <IoNotificationsOffSharp className="w-6 h-6 text-[#8F8F8F] " />
            <p>Muted</p>
        </li>
       

        {/* Divider */}
        <hr className="w-full border-gray-500 mt-40 text-[#8F8F8F]" />

        {/* Bottom Section */}
        <li className="flex gap-3 cursor-pointer hover:bg-black w-full h-12 rounded-lg items-center pl-3">
          
            <IoLogOutSharp className="w-6 h-6 text-[#8F8F8F]" />
            <p>LogOut</p>
        </li>
      </ul>
    </div>
    <div className="flex-1 ml-80">{children}</div>
    </MainLayout>
  );
};

export default SettingsLayout;
