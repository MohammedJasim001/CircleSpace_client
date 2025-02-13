/* eslint-disable @next/next/no-img-element */
'use client';

import { useLatestMessages } from '@/hooks/useMessages';
import { Chat } from '@/types/chat';
import { formatMessageTime } from '@/utils/FormateMessageTime';
import { getUserId } from '@/utils/userDetails';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MessageSidebar: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const router = useRouter();

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
    if (userId !== selectedChatId) {
      setSelectedChatId(userId); 
      router.replace(`/messages/${userId}`); 
    }
  };

  return (
    <div className="w-1/4 border-r border-[#272932] h-full p-4">
      <h2 className="font-bold text-lg mb-4">Messages</h2>
      <ul>
        {data?.map((chat: Chat) => (
          <li
            key={chat.chatPartner._id}
            className={`mb-2 ${
              selectedChatId === chat.chatPartner._id ? 'bg-[#32353f] rounded-lg' : ''
            }`}
            onClick={() => handleChatSelect(chat.chatPartner._id)}
          >
            <div className="p-2 hover:bg-[#32353f] rounded cursor-pointer flex items-center gap-3">
              <img
                src={chat.chatPartner.profileImage}
                alt={`${chat.chatPartner.userName}'s profile`}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-white">{chat.chatPartner.userName}</p>
                <p className="text-sm text-gray-200">{chat.latestMessage}</p>
              </div>
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
