import React from "react";

const MessageSidebarSkeleton = () => {
  return (
    <div className="flex flex-col h-screen p-4 w-80 rounded-lg">
      <div className="h-6 w-32 bg-gray-700 animate-pulse rounded-lg mb-4"></div>

      <div className="flex flex-col gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 animate-pulse rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="flex flex-col gap-2">
              <div className="w-40 h-3 bg-gray-700 rounded"></div>
              <div className="w-32 h-3 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageSidebarSkeleton;
