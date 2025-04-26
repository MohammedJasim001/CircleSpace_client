/* eslint-disable @next/next/no-img-element */

"use client";
import { FiImage } from "react-icons/fi";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { useState } from "react";

interface PostFormProps {
  onSubmit: (data: { content: File | null; caption: string }) => void;
  isPending: boolean;
}

export default function PostCreate({ onSubmit, isPending }: PostFormProps) {
  const [postContent, setPostContent] = useState<File | null>(null); // Renamed postImage to postContent
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const content = event.target.files?.[0];

    if (content) {
      if (
        !["image/jpeg", "image/png", "image/gif", "video/mp4"].includes(
          content.type
        )
      ) {
        setPostContent(null);
        setPreview(null);
        toast.error(
          "Invalid file type. Please upload a JPEG, PNG, GIF image, or MP4 video."
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPostContent(content);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(content);
    }
  };

  const handleSubmit = () => {
    if (postContent && caption) {
      onSubmit({ content: postContent, caption });
    } else {
      toast.error("Please upload a file and write a caption to add a post.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 sm:p-20 mb-16 sm:mb-0">
      <div
        className={`flex flex-col sm:flex-row ${
          postContent
            ? "w-80 sm:w-3/4"
            : "w-80 sm:w-96 h-80 flex items-center justify-center"
        } bg-gray-700 rounded-lg p-4 shadow-lg transition-all duration-300 gap-4`}
      >
        <div>
          <div className="w-full mb-4">
            {preview ? (
              postContent && postContent.type.includes("video") ? ( 
                <video
                  src={preview}
                  className="w-full h-64 object-cover rounded-lg"
                  controls
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              )
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <FiImage size={48} />
              </div>
            )}
          </div>

          <label
            htmlFor="file-input"
            className={`bg-[#6a3aba] text-white rounded-md px-4 py-2 cursor-pointer mt-4 hover:bg-[#5b319c] transition ${
              postContent ? "w-20" : "w-96"
            }`}
          >
            {postContent ? "Change File" : "Select image or video"}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*,video/mp4" // Accept images and MP4 videos
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="flex justify-between flex-col space-y-2">
          {postContent && (
            <>
              <textarea
                placeholder="Write a description..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#6a3aba]"
                rows={4}
                cols={40}
              />
              {isPending ? (
                <p className="text-gray-500">Posting...</p>
              ) : (
                <Button text="Post" onClick={handleSubmit} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
