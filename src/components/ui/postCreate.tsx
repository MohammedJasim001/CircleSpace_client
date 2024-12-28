/* eslint-disable @next/next/no-img-element */
import { FiImage } from "react-icons/fi";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { useState } from "react";

interface PostFormProps {
  onSubmit: (data: { image: File | null; caption: string }) => void;
  isPending: boolean;
}

export default function PostCreate({ onSubmit, isPending }: PostFormProps) {
  const [postImage, setPostImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    if (image) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(image.type)) {
        setPostImage(null);
        setPreview(null);
        toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(image);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = () => {
    if (postImage && caption) {
      onSubmit({ image: postImage, caption });
    } else {
      toast.error("Please upload an image and write a caption to add a post.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div
        className={`flex ${postImage ? "w-3/4" : "w-96 h-80 flex items-center justify-center"} bg-gray-700 rounded-lg p-4 shadow-lg transition-all duration-300 gap-2`}
      >
        <div>
          <div className="w-full mb-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <FiImage size={48} />
              </div>
            )}
          </div>

          <label
            htmlFor="file-input"
            className="bg-[#6a3aba] text-white rounded-md px-4 py-2 cursor-pointer mt-4 hover:bg-[#5b319c] transition"
          >
            {postImage ? "Change File" : "Select image from Gallery"}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="flex justify-between flex-col">
          {postImage && (
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
