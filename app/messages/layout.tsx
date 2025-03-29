'use client';

import MessageSidebar from '@/components/Messages/MessageSidebar';
import MainLayout from '@/layout/mainLayout';

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <MainLayout>
      <div className="flex h-screen">
        <MessageSidebar />

        <div className="flex-1">{children}</div>
      </div>
    </MainLayout>
  );
}