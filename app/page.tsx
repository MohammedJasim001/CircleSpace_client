'use client';

import PostView from "@/components/ui/PostView";
import withMainLayout from "@/components/WithMainLayout";
import usePosts from "@/hooks/usePosts";


 function Home() {
  const { data: posts, isLoading, error } = usePosts();
  const currentUserId = "some-user-id"; 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="flex gap-6 p-4 ml-44">
      {/* Posts Section */}
      <div className="grid grid-cols-1 gap-6 w-3/4">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <PostView key={index} post={post} currentUserId={currentUserId} />
          ))
        ) : (
          <div>No posts available.</div>
        )}
      </div>

      {/* Suggested Users Section */}
      {/* <div className="w-1/4 mr-20 mt-2">
        <UserSuggession />
      </div> */}
    </div>
  );
}

export default withMainLayout(Home);
