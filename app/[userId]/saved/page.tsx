/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname } from "next/navigation";
import {useProfile} from "@/hooks/useProfile";

interface Post {
  content: string;
}


const PostSavedPage = () => {
  const pathname = usePathname(); // Get the current URL path
  const userId = pathname.split("/")[1]; // Extract userId from the path, assuming URL structure is "/[userId]"

  


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
    <div className="grid grid-cols-3 md:grid-cols-3 gap-0.5 sm:gap-4 mt-6 mb-10 sm:mb-0 sm:mr-40 sm:ml-32">
    {userDetails?.data?.savedPosts?.map((post:Post, index:string) => (
      <div key={index} className="rounded-lg overflow-hidden ">
        {post.content?.includes("mp4") ||
        post.content?.includes("youtube") ? (
          <video
            controls
            className="w-full h-44 sm:h-96 object-cover"
            src={post.content}
            // alt={`Post ${index + 1}`}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={post.content}
            alt={`Post ${index + 1}`}
            className="w-full h-44 sm:h-96 object-cover"
          />
        )}
      </div>
    ))}
  </div>
  );
};

export default PostSavedPage
