import Image from "next/image";

// components/LoadingSpinner.tsx
const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
        width={200}
        height={200}
        src={'/images/logo.png'}
        alt="logo"
        />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;