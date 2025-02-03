/* eslint-disable @next/next/no-img-element */
'use client';

import { useLatestMessages } from '@/hooks/useMessages';
import { Chat } from '@/types/chat';
import { formatMessageTime } from '@/utils/FormateMessageTime';
import { getUserId } from '@/utils/userDetails';
import React, { useEffect, useState } from 'react';

interface MessageSidebarProps {
  onSelectChat: (userId: string) => void;
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({ onSelectChat }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // Track selected chat

  // Fetch current user ID
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getUserId();
        setCurrentUserId(userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchCurrentUserId();
  }, []);

  // Get the latest messages
  const { data } = useLatestMessages(currentUserId || '');

  const handleChatSelect = (userId: string) => {
    setSelectedChatId(userId); // Update selected chat
    onSelectChat(userId); // Pass it to the parent component
  };

  return (
    <div className="w-1/4 border-r border-[#272932] h-full p-4">
      <h2 className="font-bold text-lg mb-4">Messages</h2>
      <ul>
        {data?.map((chat: Chat) => (
          <li
            key={chat.chatPartner._id}
            className={`mb-2 ${
              selectedChatId === chat.chatPartner._id
                ? 'bg-[#32353f]' // Highlight selected chat
                : ''
            }`}
            onClick={() => handleChatSelect(chat.chatPartner._id)} // Set selected chat
          >
            <div className="p-2 hover:bg-[#32353f] rounded cursor-pointer flex items-center gap-3">
              {/* Profile Image */}
              <img
                src={chat.chatPartner.profileImage}
                alt={`${chat.chatPartner.userName}'s profile`}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              {/* User and Message Info */}
              <div className="flex-1">
                <p className="font-medium text-white">{chat.chatPartner.userName}</p>
                <p className="text-sm text-gray-200">{chat.latestMessage}</p>
              </div>
              {/* Timestamp */}
              <span className="text-xs text-gray-300">
                {formatMessageTime(chat.timestamp)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageSidebar;
