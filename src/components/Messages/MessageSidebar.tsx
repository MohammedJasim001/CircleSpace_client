/* eslint-disable @next/next/no-img-element */
"use client";

import { useLatestMessages } from "@/hooks/useMessages";
import { Chat } from "@/types/chat";
import { formatMessageTime } from "@/utils/FormateMessageTime";
import { getUserId } from "@/utils/userDetails";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import MessageSidebarSkeleton from "../skeltons/messageSidebarSkelton";
import { useProfile } from "@/hooks/useProfile";
import { useSocket } from "@/hooks/useSockets";

interface LatestMessage {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
}

const MessageSidebar: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [updatedChats, setUpdatedChats] = useState<Chat[]>([]);

  const router = useRouter();
  const { recieverId } = useParams() as { recieverId: string };

  const { socket } = useSocket(currentUserId, recieverId);

  const { data: chats, isLoading } = useLatestMessages(currentUserId || "");
  const { data: receiverData, isLoading: isReceiverLoading } =
    useProfile(recieverId);

  const isReceiverInChats = chats?.some(
    (chat: Chat) => chat.chatPartner._id === recieverId
  );

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

  useEffect(() => {
    if (!socket) return;

    const handleLatestMessageUpdate = ({
      senderId,
      receiverId,
      message,
      timestamp,
    }: LatestMessage) => {
      setUpdatedChats((prevChats) => {
        const updatedChats = prevChats.map((chat) =>
          chat.chatPartner._id === senderId ||
          chat.chatPartner._id === receiverId
            ? { ...chat, latestMessage: message, timestamp }
            : chat
        );

        return updatedChats.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    };

    socket.on("latestMessageUpdate", handleLatestMessageUpdate);

    return () => {
      socket.off("latestMessageUpdate", handleLatestMessageUpdate);
    };
  }, [socket]);

  useEffect(() => {
    if (chats) {
      setUpdatedChats(chats);
    }
  }, [chats]);

  const handleChatSelect = useCallback(
    (userId: string) => {
      router.replace(`/messages/${userId}`);
    },
    [router]
  );

  if (isLoading) return <MessageSidebarSkeleton />;

  return (
    <div className="w-full md:w-1/4 border-r border-[#272932] h-full p-4">
      <h2 className="font-bold text-lg mb-4">Messages</h2>
      <ul>
        {recieverId &&
          !isReceiverInChats &&
          receiverData &&
          !isReceiverLoading && (
            <li
              key={receiverData.data._id}
              className="mb-2 bg-[#32353f] rounded-lg"
              onClick={() => handleChatSelect(receiverData.data._id)}
            >
              <div className="p-2 hover:bg-[#32353f] rounded cursor-pointer flex items-center gap-3">
                <img
                  src={receiverData.data.profileImage || "/default-avatar.png"}
                  alt={`${receiverData.data.userName}'s profile`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div className="flex-1">
                  <p className="font-medium text-white">
                    {receiverData.data.userName}
                  </p>
                  <p className="text-sm text-gray-200">Start a conversation</p>
                </div>
                <span className="text-xs text-gray-300">New</span>
              </div>
            </li>
          )}

        {updatedChats.map((chat: Chat) => (
          <li
            key={chat.chatPartner._id}
            className={`mb-2 ${
              recieverId === chat.chatPartner._id
                ? "bg-[#32353f] rounded-lg"
                : ""
            }`}
            onClick={() => handleChatSelect(chat.chatPartner._id)}
          >
            <div className="p-2 hover:bg-[#32353f] rounded cursor-pointer flex items-center gap-3">
              <img
                src={chat.chatPartner.profileImage || "/default-avatar.png"}
                alt={`${chat.chatPartner.userName}'s profile`}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-medium text-white">
                  {chat.chatPartner.userName}
                </p>
                <p className="text-sm text-gray-200">
                  {chat.latestMessage || "No messages yet"}
                </p>
              </div>
              <span className="text-xs text-gray-300">
                {chat.timestamp ? formatMessageTime(chat.timestamp) : "New"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageSidebar;
