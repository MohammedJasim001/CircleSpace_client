import React from "react";

const CommonSkelton = () => {
  return (
    <div>
      <div>
        <div className="w-28 hidden lg:flex flex-col bg-gray-600 animate-pulse p-4 rounded-xl shadow-md h-screen fixed left-0 top-0 pt-16 items-center">
          <div className="h-12 w-12 bg-gray-700 mb-2 rounded-full"></div>
          <div className="h-3 bg-gray-700 mb-3 w-24"></div>
          <div className="mt-14">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-center mb-8">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              </div>
            ))}
          </div>
          <div className="w-8 h-8 bg-gray-700 rounded-full mt-24"></div>
        </div>
      </div>

      <div className="w-4/5 flex justify-between items-center px-4 py-3 animate-pulse fixed top-0 left-0 right-0 z-10 ml-52 mt-2">
        <div className="w-2/5 h-12 bg-gray-700 rounded-md"></div>
        <div className="flex gap-4 mr-3">
          <div className="w-14 h-14 bg-gray-700 rounded-xl"></div>
          <div className="w-14 h-14 bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CommonSkelton;
