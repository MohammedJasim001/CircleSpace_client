"use client";

import React from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

interface EmojiPickerWrapperProps {
  onSelectEmoji: (emoji: string) => void;
  position: string;
  size: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  iconPosition?:string
}

const EmojiPickerWrapper: React.FC<EmojiPickerWrapperProps> = ({
  onSelectEmoji,
  position,
  size,
  isOpen,
  setIsOpen,
  iconPosition,
}) => {
  const handleEmojiClick = (emojiData: { emoji: string }) => {
    onSelectEmoji(emojiData.emoji);
  };

  return (
    <div className="relative">
      <BsEmojiSmile
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${size} ${iconPosition}`}
      />

      {isOpen && (
        <div className={`${position} z-10 bg-white rounded shadow-md`}>
          <div className="flex justify-end p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
          </div>
          <EmojiPicker onEmojiClick={handleEmojiClick}/>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerWrapper;
