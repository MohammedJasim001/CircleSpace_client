"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUserId } from "@/utils/userId";
import ProfilePage from "@/components/ui/ProfilePage";
import useProfile from "@/hooks/useProfile";
import withMainLayout from "@/components/WithMainLayout";

const UserProfilePage = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const pathname = usePathname(); // Get the current URL path
  const userId = pathname.split("/")[1]; // Extract userId from the path, assuming URL structure is "/[userId]"

  // Fetch current user's ID on initial load
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const id = await getUserId(); // Get the logged-in user ID
        setCurrentUserId(id); // Set the current user ID
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchCurrentUserId();
  }, []);


  // Fetch user profile using the custom hook
  const { data: userDetails, isLoading, error } = useProfile(userId);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading profile</div>;
  }

  return (
    <ProfilePage
      userId={userId}
      userDetails={userDetails.data}
      currentUserId={currentUserId || ""}
    />
  );
};

export default withMainLayout(UserProfilePage);