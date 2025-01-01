"use client";

import { useEffect, useState } from "react";
import { getUserId } from "@/utils/userDetails";
import PostCreate from "@/components/ui/postCreate";
// import withMainLayout from "@/components/WithMainLayout";
import { useCreatePost } from "@/hooks/usePosts";
import MainLayout from "@/layout/mainLayout";

function CreatePostPage() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { mutate, isPending } = useCreatePost();

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

  const handlePostSubmit = (data: {
    content: File | null;
    caption: string;
  }) => {
    if (currentUserId) {
      const formData = new FormData();

      formData.append("description", data.caption);
      if (data.content) formData.append("media", data.content);

      mutate({ userId: currentUserId, formData });
    }
  };

  return (
    <div>
      <MainLayout>
        <div className="pt-28 max-w-[90%] ml-44">
          <h2 className="text-white text-xl font-semibold mb-4">
            Create new post{" "}
          </h2>
          {currentUserId && (
            <PostCreate onSubmit={handlePostSubmit} isPending={isPending} />
          )}
        </div>
      </MainLayout>
    </div>
  );
}

export default CreatePostPage;
