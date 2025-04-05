/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = "http://localhost:5010";

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  createdAt: Date;
}

export const useSocket = (
  currentUserId: string | null, 
  chatPartnerId: string | null
) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Use useCallback to prevent this function from being recreated on every render
  const sendMessage = useCallback((messageContent: string) => {
    if (!chatPartnerId || !currentUserId || !socket) return null;

    const newMessage: Message = {
      _id: Date.now().toString(),
      sender: currentUserId,
      receiver: chatPartnerId,
      content: messageContent,
      createdAt: new Date(),
    };

    socket.emit("sendMessage", newMessage);

    socket.emit("updateLatestMessages", {
        senderId: currentUserId,
        receiverId: chatPartnerId,
        message: newMessage.content,
        timestamp: newMessage.createdAt,
      });
    return newMessage;
  }, [chatPartnerId, currentUserId, socket]);

  useEffect(() => {
    // Only create a socket if we have both IDs and aren't already connected
    if (!chatPartnerId || !currentUserId) {
      return;
    }

    // Clean up previous socket if it exists
    if (socket) {
      socket.disconnect();
    }

    // Create new socket
    const newSocket = io(SOCKET_URL, { withCredentials: true });
    setSocket(newSocket);
    
    // Connect the socket
    newSocket.emit("connected", currentUserId);
    setIsConnected(true);
    
    // Clean up function
    return () => {
      newSocket.disconnect();
      setIsConnected(false);
      setSocket(null);
    };
  }, [chatPartnerId, currentUserId]); // Don't include socket or isConnected here

  return { 
    socket, 
    isConnected, 
    sendMessage 
  };
};