import ChatWindow from '@/components/Messages/ChatWindow';
import MessageSidebar from '@/components/Messages/MessageSidebar';
import MainLayout from '@/layout/mainLayout';

const MessagesPage = () => {
  return (
    <MainLayout>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <MessageSidebar/>
        {/* Chat Window */}
        <ChatWindow />
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
