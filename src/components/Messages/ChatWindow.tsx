"use client";

import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import EmptyChat from "./EmptyChat";
import { useGetPersonalChat } from "@/hooks/useMessages";
import { getUserId } from "@/utils/userDetails";
import { Message, useSocket } from "@/hooks/useSockets";
import MessageSkeleton from "../skeltons/messageSkelton";

interface ChatWindowProps {
  chatPartnerId: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatPartnerId }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setCurrentUserId(userId);
    };
    fetchUserId();
  }, []);

  const { data, isLoading } = useGetPersonalChat(
    currentUserId || "",
    chatPartnerId || ""
  );
 
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const { socket, sendMessage } = useSocket(currentUserId, chatPartnerId);


  useEffect(() => {
    if (!socket) return;
  
    const handleIncomingMessage = (message: Message) => {
      console.log(message,'message');
      if (
        (message.sender === chatPartnerId && message.receiver === currentUserId) ||
        (message.sender === currentUserId && message.receiver === chatPartnerId)
      ) {
        setMessages(prev => [...prev, message]);
      }
    };
  
    socket.on("receiveMessage", handleIncomingMessage);
    return () => {
      socket.off("receiveMessage", handleIncomingMessage)
    }
  }, [socket, chatPartnerId, currentUserId]);
  

  const handleSendMessage = (messageContent: string) => {
    const newMessage = sendMessage(messageContent);
    if (newMessage) {
      setMessages(prev => [...prev, newMessage]);
    }
  };

  if (isLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col overflow-y-scroll scrollbar-hide">
      {chatPartnerId ? (
        <>
          <MessageList messages={messages} currentUserId={currentUserId} />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default ChatWindow;