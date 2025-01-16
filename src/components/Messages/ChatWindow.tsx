'use client';

import React, { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5010'; // Replace with your server URL

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: 'user1', content: 'Hello!' },
    { sender: 'me', content: 'Hi! How are you?' },
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (messageContent: string) => {
    const newMessage = { sender: 'me', content: messageContent };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket?.emit('sendMessage', newMessage);
  };

  return (
    <div className="w-3/4 h-full p-4 flex flex-col">
      <div className="flex-grow overflow-y-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}
          >
            <p className="inline-block p-2 rounded-lg bg-gray-700">{message.content}</p>
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
