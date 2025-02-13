'use client';

import ChatWindow from '@/components/Messages/ChatWindow';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ChatPage = () => {
  const params = useParams();
  const chatPartnerId = params.userId as string; // Get user ID from the URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatPartnerId) {
      setLoading(false);
    }
  }, [chatPartnerId]);

  if (loading) return <div className="text-center py-5">Loading chat...</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <ChatWindow chatPartnerId={chatPartnerId} />
    </div>
  );
};

export default ChatPage;
