/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getUserId, userDetails } from "@/utils/userDetails";
import useSearch from "@/hooks/useSearch"; // Import the useSearch hook
import SearchResults from "../ui/SearchResults";
import Image from "next/image";

interface UserProfile {
  name?: string;
  email?: string;
  profileImage?: string;
  userName?: string;
}

const Navbar: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Search query state
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>({});

  const { data: searchResults, isLoading, error } = useSearch(query); // Use the custom hook for searching
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();

  // Fetch current user info when the component mounts
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getUserId();
        const user = await userDetails();
        setUserProfile(user);
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.trim().length > 0); // Show results only if the input is not empty
  };

  // Handle result click
  const handleResultClick = () => {
    setQuery(""); // Clear the input field
    setShowResults(false); // Hide search results
  };

  return (
    <nav className="text-white px-2 py-4 sm:px-10 w-full h-16 sm:h-24 fixed bg-[#1a1c26] z-10">
      <div className=" flex justify-between items-center">
        <Image
          width={200}
          height={200}
          src={"/images/logoName.png"}
          alt="appLogo"
          className=" w-20 h-9 block sm:h-12 sm:w-28  md:hidden"
        />
        {/* Search Bar */}
        <div className="relative flex items-center bg-[#272932] rounded-lg pl-10 py-1 h-9 sm:h-12 w-2/4 md:w-1/3 md:ml-28 lg:ml-44">
          <FiSearch className=" absolute text-xl left-3 mr-1 text-[#8F8F8F]" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearchChange}
            className="bg-transparent text-white outline-none flex-grow"
          />
          {showResults && !isLoading && searchResults && (
            <SearchResults
              results={searchResults}
              onResultClick={handleResultClick}
            />
          )}
          {isLoading && (
            <div className="absolute top-0 right-0 p-2 text-white">
              Loading...
            </div>
          )}
          {error && (
            <div className="absolute top-0 right-0 p-2 text-red-500">
              Error: {error.message}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-10 md:mr-20 ">
          <div className="bg-[#272932] h-9 w-9 sm:h-14 sm:w-14 rounded-lg flex items-center justify-center">
            <FiBell className="text-2xl text-[#8F8F8F]" />
          </div>

          <div
            className="bg-[#272932] h-9 w-9 sm:h-14 sm:w-14 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => router.push(`/${currentUserId}`)}
          >
            {userProfile && userProfile.profileImage ? (
              <img
                src={userProfile.profileImage}
                alt="User Profile"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <FaUserCircle className="text-2xl text-[#8F8F8F]" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
