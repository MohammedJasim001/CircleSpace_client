"use client"; // Ensure it's a client-side component

import { MdBlockFlipped } from "react-icons/md";
import { IoLogOutSharp, IoNotificationsOffSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import MainLayout from "@/layout/mainLayout";
import { FaLock } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

type SettingsLayoutProps = {
  children: React.ReactNode;
};


const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const router = useRouter()
  const handleLogout = () =>{
    localStorage.removeItem('user')
    router.push('/auth/login')
  }
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path;


  return (
    <MainLayout>
      
    <div className={`w-full sm:w-64 text-white min-h-screen p-4 flex flex-col fixed border-r border-gray-500 ${pathname.split('/')[2]!==undefined && "sm:block hidden"}`}>
      <h2 className=" mt-10 text-xl font-semibold ml-4 gap-2">Settings</h2>
      <ul className="flex flex-col  gap-5 w-full mt-12 ">
        {/* Top Section */}
        <li 
         onClick={() => router.push("/settings/editProfile")}
         className={`flex gap-3 cursor-pointer w-full h-12 rounded-lg items-center pl-3 ${
           isActive("/settings/editProfile") ? "bg-[#272932]" : "sm:hover:bg-[#32353f]"
         }`}
        >
          
           <FaRegUserCircle  className="w-6 h-6 text-[#8F8F8F]" />
            <p>Edit Profile</p>
        </li>

        <li
        onClick={()=>router.push('/settings/accountPrivacy')}
         className={`flex  gap-3 cursor-pointer w-full h-12 rounded-lg items-center pl-3 ${
          isActive('/settings/accountPrivacy') ?"bg-[#272932]" : "sm:hover:bg-[#32353f]"}`}
         >
            <FaLock className="w-6 h-6 text-[#8F8F8F]" />
            <p>Account Privacy</p>
        </li>
        <li 
        onClick={()=> router.push('/settings/blocked')}
        className={`flex gap-3 cursor-pointer w-full h-12 rounded-lg items-center pl-3 ${
          isActive('/settings/blocked')?"bg-[#272932]" : "sm:hover:bg-[#32353f]"}`}
        >
        
            <MdBlockFlipped className="w-6 h-6 text-[#8F8F8F]" />
            <p>Blocked</p>
        </li>
        <li 
        onClick={()=> router.push('/settings/muted')}
        className={`flex gap-3 cursor-pointer w-full h-12 rounded-lg items-center pl-3 ${
          isActive('/settings/muted')?"bg-[#272932]" : "sm:hover:bg-[#32353f]"}`}
        >
          
            <IoNotificationsOffSharp className="w-6 h-6 text-[#8F8F8F] " />
            <p>Muted</p>
        </li>
       

        <hr className="w-full border-gray-500 mt-32 sm:mt-44 text-[#8F8F8F]" />

        <li
         onClick={handleLogout}
         className="flex gap-3 cursor-pointer hover:bg-[#32353f] w-full h-12 rounded-lg items-center pl-3">
          
            <IoLogOutSharp className="w-6 h-6 text-[#8F8F8F]" />
            <p>LogOut</p>
        </li>
      </ul>
    </div>
    <div className={`flex-1 p-2 sm:p-0 sm:ml-96 ${pathname.split('/')[2]===undefined && "hidden"}`}>{children}</div>
    </MainLayout>
  );
};

export default SettingsLayout;
