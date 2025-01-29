'use client';

import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import { io, Socket } from 'socket.io-client';
import { useGetPersonalChat } from '@/hooks/useMessages';
import { getUserId } from '@/utils/userDetails';

const SOCKET_URL = 'http://localhost:5010';

interface ChatWindowProps {
  chatPartnerId: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatPartnerId }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Fetch current user ID
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setCurrentUserId(userId);
    };

    fetchUserId();
  }, []);

  // Fetch chat messages only when chatPartnerId is selected
  const { data } = useGetPersonalChat(currentUserId || '', chatPartnerId || '');

  // Socket connection setup
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('receiveMessage', (message) => {
      console.log("Received Message:", message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (messageContent: string) => {
    if (!chatPartnerId) return;

    const newMessage = { sender: currentUserId, receiver: chatPartnerId, content: messageContent };
    socket?.emit('sendMessage', newMessage);
  };

  return (
    <div className="w-3/4 h-full p-4 flex flex-col">
      {chatPartnerId ? (
        <>
          <div className="flex-grow overflow-y-scroll">
            {data?.map((message:any, index:string) => (
              <div
                key={index}
                className={`p-2 ${message.sender._id === currentUserId ? 'text-right ' : 'text-left'}`}
              >
                <p className={`inline-block p-2 rounded-lg ${message.sender._id === currentUserId ? 'bg-blue-500' : 'bg-gray-700'}`}>{message.content}</p>
              </div>
            ))}
          </div>
          <MessageInput onSendMessage={sendMessage} />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a chat to start messaging.
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
