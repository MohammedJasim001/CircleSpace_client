'use client';

import React, { useEffect, useState, useRef } from 'react';
import MessageInput from './MessageInput';
import { io, Socket } from 'socket.io-client';
import { useGetPersonalChat, useSendMessage } from '@/hooks/useMessages';
import { getUserId } from '@/utils/userDetails';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface Messages {
  _id: string;
  sender: { _id: string };
  receiver: string;
  content: string;
  createdAt: Date;
}

const SOCKET_URL = 'http://localhost:5010';

interface ChatWindowProps {
  chatPartnerId: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatPartnerId }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setCurrentUserId(userId);
    };
    fetchUserId();
  }, []);

  const { data } = useGetPersonalChat(currentUserId || '', chatPartnerId || '');

  useEffect(() => {
    if (data) {
      const uniqueMessages = data.filter(
        (msg: Messages, index: number, self: Messages[]) =>
          index === self.findIndex((m) => m._id === msg._id)
      );
      setMessages(uniqueMessages);
    }
  }, [data]);

  useEffect(() => {
    if (!chatPartnerId || isSocketConnected) return;

    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    setIsSocketConnected(true);

    newSocket.on('receiveMessage', (message) => {
      console.log(message,'receive message');
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    // newSocket.on('receiveMessage',(message)=>{
    //   console.log(message,'receive message');
    //   setMessages((prev)=>[...prev,{...message,sender:{_id:message.sender}}])
    // })


    return () => {
      newSocket.disconnect();
      setIsSocketConnected(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatPartnerId,currentUserId]);

  const { mutate } = useSendMessage();

  const sendMessage = (messageContent: string) => {
    if (!chatPartnerId || !currentUserId) return;

    const newMessage = {
      _id: Date.now().toString(), 
      sender: { _id: currentUserId }, 
      receiver: chatPartnerId,
      content: messageContent,
      createdAt: new Date(), 
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    mutate(
      { sender: currentUserId, receiver: chatPartnerId, content: messageContent },
      {
        onSuccess: (sentMessage) => {
          console.log("Sending message:", { sentMessage});
          socket?.emit('sendMessage', sentMessage);
        },
        // onError: () => {
        //   setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== newMessage._id));
        // },
      }
    );
  };

  const groupMessagesByDate = () => {
    const grouped: Record<string, Messages[]> = {};

    messages.forEach((message) => {
      const messageDate = dayjs(message.createdAt);
      let dateLabel = messageDate.format('DD/MM/YYYY');

      if (messageDate.isToday()) {
        dateLabel = 'Today';
      } else if (messageDate.isYesterday()) {
        dateLabel = 'Yesterday';
      }

      if (!grouped[dateLabel]) {
        grouped[dateLabel] = [];
      }

      grouped[dateLabel].push(message);
    });

    return grouped;
  };

  const groupedMessages = groupMessagesByDate();

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Scroll to the bottom on initial render
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col overflow-y-scroll scrollbar-hide">
      {chatPartnerId ? (
        <>
          <div className="flex-grow">
            {Object.entries(groupedMessages).map(([date, msgs], index) => (
              <div key={index}>
                <div className="text-center text-gray-400 text-sm my-2">{date}</div>
                {msgs.map((message: Messages, msgIndex: number) => {
                  const isCurrentUser = message.sender._id === currentUserId;
                  return (
                    <div key={msgIndex} className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} my-1`}>
                      <div
                        className={`px-2 pt-1 max-w-xs rounded-lg ${
                          isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className={`text-xs text-gray-400 text-right ml-10`}>
                          {dayjs(message.createdAt).format('hh:mm A')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
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