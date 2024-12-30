'use client';

import PostView from "@/components/ui/PostView";
import UserSuggession from "@/components/ui/userSuggestion";
import withMainLayout from "@/components/WithMainLayout";
import { usePosts } from "@/hooks/usePosts";
import { getUserId } from "@/utils/userId";
import { useEffect, useState } from "react";


 function Home() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { data: posts, isLoading, error } = usePosts();

  useEffect(() => {
      const fetchCurrentUserId = async () => {
        try {
          const userId = await getUserId();
          setCurrentUserId(userId);
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      };
  
      fetchCurrentUserId();
    }, []);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="flex gap-6 p-4 ml-44">
      {/* Posts Section */}
      <div className="grid grid-cols-1 gap-6 w-3/4">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <PostView key={index} post={post} currentUserId={currentUserId || ""} />
          ))
        ) : (
          <div>No posts available.</div>
        )}
      </div>

      {/* Suggested Users Section */}
      <div className="w-1/4 mr-20 mt-2">
        <UserSuggession currentUserId = {currentUserId || ""}/>
      </div>
    </div>
  );
}

export default withMainLayout(Home);
