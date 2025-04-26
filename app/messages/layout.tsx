'use client';

import MessageSidebar from '@/components/Messages/MessageSidebar';
import MainLayout from '@/layout/mainLayout';
import { useParams } from 'next/navigation';

export default function MessagesLayout({ children }: { children: React.ReactNode }) {

  const {recieverId} = useParams()
    
  return (
    <MainLayout>
      <div className="flex h-screen">
        <MessageSidebar />

        <div className={`${!recieverId&& 'hidden sm:block'}flex-1 w-full`}>{children}</div>
      </div>
    </MainLayout>
  );
}