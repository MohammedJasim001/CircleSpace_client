import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col h-screen p-4">
       
      <div className="flex flex-col flex-grow gap-4 p-4 overflow-y-auto">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`flex   ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`flex flex-col  gap-2 bg-gray-600 w-44 h-10 rounded-md p-2${
                index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              <div className="w-32 h-3 bg-gray-700 rounded-lg"></div>
              <div className="w-24 h-3 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-3  animate-pulse rounded-lg shadow-md">
        <div className="flex-grow h-10 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
