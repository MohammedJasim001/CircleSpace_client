'use client'

import { useState } from 'react';
import ChatWindow from '@/components/Messages/ChatWindow';


const MessagesPage = () => {
  const [selectedChatPartner] = useState<string | null>(null);

  return (
      <div className="flex h-screen">
        {/* Left Sidebar */}
        
        {/* Chat Window */}
        <ChatWindow chatPartnerId={selectedChatPartner} />
      </div>
  );
};

export default MessagesPage;