'use client';

import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";

interface MessageInputProps {
  onSendMessage: (messageContent: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-4 mr relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-10 w-full rounded p-2 bg-gray-600"
        placeholder="Type your message..."
      />
      <IoSend 
      onClick={handleSend}
      className='text-3xl absolute right-2'
      />
      {/* <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded "
      >
        Send
      </button> */}
    </div>
  );
};

export default MessageInput;
