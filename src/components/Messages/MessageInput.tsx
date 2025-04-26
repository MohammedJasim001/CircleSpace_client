"use client";

import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import EmojiPickerWrapper from "../EmojiPicker/EmojiPicker";

interface MessageInputProps {
  onSendMessage: (messageContent: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setShowPicker(false)
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-4 relative">
      <div className="absolute left-5">
        <EmojiPickerWrapper
          onSelectEmoji={handleAddEmoji}
          position={"absolute bottom-12 left-0"}
          size="text-2xl"
          isOpen={showPicker}
          setIsOpen={setShowPicker}
        />
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-10 w-full rounded p-2 bg-gray-600 pl-16"
        placeholder="Type your message..."
      />
      <IoSend onClick={handleSend} className="text-3xl absolute right-2" />
    </div>
  );
};

export default MessageInput;
