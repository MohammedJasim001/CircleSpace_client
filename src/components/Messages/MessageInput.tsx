'use client';

import React, { useState } from 'react';

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
    <div className="mt-4 flex items-center justify-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border w-full rounded p-2 bg-gray-600"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded "
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
