import React from "react";
import CommonSkelton from "./commonSkelton";

const HomeSkeleton = () => {
  return (
    <div className="flex justify-between p-4 pt-28 min-h-screen">
      <CommonSkelton />

      <div className="flex w-full pt-">
        <div className="flex flex-grow justify-center lg:ml-20 w-full">
          <div className="grid grid-cols-1 gap-6 max-w-md w-full">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className=" animate-pulse p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div className="w-32 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="w-full h-48 bg-gray-700 rounded"></div>
                <div className="w-full h-6 bg-gray-700 rounded mb-2 mt-5"></div>
                <div className="w-5/6 h-6 bg-gray-700 rounded mb-2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/4 mr-28 mt-2 hidden lg:block">
          <div className=" animate-pulse p-4 rounded-xl shadow-md">
            <div className="w-36 h-4 bg-gray-700 rounded mb-3"></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="w-28 h-4 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
