import { Message } from '@/types/message';
import { formatMessageTime } from '@/utils/dateFormaters';
import React from 'react';


interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} my-1`}>
      <div
        className={`px-2 pt-1 max-w-xs rounded-lg ${
          isCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        <p>{message.content}</p>
        <div className="text-xs text-gray-400 text-right ml-10">
          {formatMessageTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;