import React from "react";
import CommonSkelton from "./commonSkelton";

const ProfileSkelton = () => {
  return (
    <div>
      <CommonSkelton />

      <div>
        <div className="  mr-40 mt-28 pt-24 ml-56 animate-pulse bg-gray-600 relative rounded-md h-40">
          <div className="w-28 h-28 rounded-full bg-gray-700  absolute left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className=" animate-pulse w-full flex justify-center items-center mt-20 flex-col">
          <div className="ml-10 flex flex-col items-center justify-center">
            <div className="w-40 h-5 rounded bg-gray-700 mt-2"></div>
            <div className="w-32 h-4 rounded bg-gray-700 mt-2"></div>
            <div className="w-48 h-3 rounded bg-gray-700 mt-2"></div>
          </div>
          <div className="flex">
              <div  className=" ml-6 flex flex-col items-center justify-center mt-8">
                <div className=" w-64 h-5 rounded bg-gray-700 mt-2"></div>
                <div className="w-72 h-5 rounded bg-gray-700 mt-3"></div>
              </div>
          </div>
          <div className="w-32 h-10 bg-gray-700 mt-6 rounded-md ml-10"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkelton;
