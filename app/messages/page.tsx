'use client'

import { useState } from 'react';
import ChatWindow from '@/components/Messages/ChatWindow';
import MessageSidebar from '@/components/Messages/MessageSidebar';
import MainLayout from '@/layout/mainLayout';

const MessagesPage = () => {
  const [selectedChatPartner, setSelectedChatPartner] = useState<string | null>(null);

  return (
    <MainLayout>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <MessageSidebar onSelectChat={setSelectedChatPartner} />
        
        {/* Chat Window */}
        <ChatWindow chatPartnerId={selectedChatPartner} />
      </div>
    </MainLayout>
  );
};

export default MessagesPage;