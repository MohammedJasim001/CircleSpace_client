"use client";

import HomeSkeleton from "@/components/skeltons/homeSkelton";
import PostView from "@/components/ui/PostView";
import UserSuggession from "@/components/ui/userSuggestion";
// import withMainLayout from "@/components/WithMainLayout";
import { usePosts } from "@/hooks/usePosts";
import MainLayout from "@/layout/mainLayout";
import { getUserId } from "@/utils/userDetails";
import { useEffect, useState } from "react";

function Home() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { data: posts, error, isLoading } = usePosts();

  
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
  
  if(isLoading){
    return <HomeSkeleton/>
  }
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <MainLayout>
      <div className="flex justify-between p-4 pt-20 sm:pt-28">
        {/* Posts Section */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl ">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <PostView
                key={index}
                post={post}
                currentUserId={currentUserId || ""}
              />
            ))
          ) : (
            <div>No posts available.</div>
          )}
        </div>

        <div className="w-1/4 mr-20 mt-2 hidden lg:block">
          <UserSuggession currentUserId={currentUserId || ""} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
