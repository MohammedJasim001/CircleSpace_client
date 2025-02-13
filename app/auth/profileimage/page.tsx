"use client";

import Button from "@/components/Button/Button";
import { useProfileImageUpload } from "@/hooks/useProfileImag";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const ProfileImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter()

  const searchParams = useSearchParams();
  useEffect(() => {
    setEmail(searchParams.get("email"));
  }, [searchParams]);

  // Use the custom hook for image upload
  const { mutate, isPending, isError  } = useProfileImageUpload();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected");
      return;
    }

    // Clear errors and set the image
    setError(null);
    setImage(file);

    // Generate a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("media", image);
    formData.append("email", email || ""); // Ensure email is included (if it's available)

    // Call the mutate function from the custom hook
    mutate(formData, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="mb-6 text-xl font-semibold">Select Profile Image</div>
      <div className="flex flex-col items-center">
        <div>
          <label
            htmlFor="file-input"
            className="mt-2 inline-block bg-[#6a3aba] text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Choose Image
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        {preview && (
          <div className="relative mt-5">
            <Image
              src={preview}
              alt="Preview"
              className="rounded-full w-32 h-32 object-cover"
              width={128}
              height={128}
              unoptimized={true}
            />
          </div>
        )}
        {/* Conditionally render the button */}
        {image && (
          <div className="mt-5">
            <Button
              text={isPending ? "Uploading..." : "Set Profile Image"}
              onClick={handleSubmit}
              isDisabled={isPending}
            />
          </div>
        )}
        {isError && (
          <p className="mt-2 text-sm text-red-600">Error uploading image</p>
        )}
       
      </div>
    </div>
  );
};

const ProfileImageUploadWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProfileImageUpload />
  </Suspense>
);

export default ProfileImageUploadWithSuspense;
