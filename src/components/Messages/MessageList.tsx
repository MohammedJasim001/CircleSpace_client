import React, { useRef, useEffect } from 'react';

import MessageItem from './MessageItem';
import { groupMessagesByDate } from '@/utils/dateFormaters';
import DateDivider from './ChatDevider';
import { Message } from '@/types/message';

interface MessageListProps {
  messages: Message[];
  currentUserId: string | null;
}

const   MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-grow">
      {Object.entries(groupedMessages).map(([date, msgs], index) => (
        <div key={index}>
          <DateDivider date={date} />
          {msgs.map((message: Message, msgIndex: number) => (
            <MessageItem
              key={msgIndex}
              message={message}
              isCurrentUser={message.sender === currentUserId}
            />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;