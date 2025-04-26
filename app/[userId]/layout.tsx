'use client'

import ProfileSkelton from "@/components/skeltons/profileSkelton";
import ProfilePage from "@/components/ui/ProfilePage";
import { useProfile } from "@/hooks/useProfile";
import MainLayout from "@/layout/mainLayout";
import { getUserId } from "@/utils/userDetails";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {

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
      const { data: userDetails, isLoading, error, refetch } = useProfile(userId);
    
      // Handle loading state
      if (isLoading) {
        return <ProfileSkelton/>
      }
    
      // Handle error state
      if (error) {
        return <div>Error loading profile</div>;
      }
    


  return (
    <MainLayout>
    <div className="text-white py-5  ">

    <ProfilePage 
      userId={userId}
      userDetails={userDetails.data}
      currentUserId={currentUserId || ""}
      onRefetch = {refetch}
    />
    
      {/* Dynamic Content (Posts/Saved) */}
      <div className="mt-6 px-">{children}</div>


    </div>
    </MainLayout>
  );
}
