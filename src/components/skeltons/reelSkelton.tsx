import CommonSkelton from "./commonSkelton";

const ReelSkelton = () => {
  return (
    <div>
      <CommonSkelton />
      <div className="flex justify-center animate-pulse ">
        <div className="h-[78vh] w-80 bg-gray-600 mt-28 mr-5 rounded-md relative">
          <div className="flex absolute bottom-8 left-2 z-10 items-center justify-center gap-2 ">
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="w-20 h-4 bg-gray-700 rounded"></div>
          </div>
          <div className="w-28 h-3 bg-gray-700 rounded absolute bottom-2 left-2 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default ReelSkelton;
