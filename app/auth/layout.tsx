// src/app/auth/layout.tsx
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen ">
        {/* Right side (content, forms) */}
        <div className="w-full lg:w-2/5 flex justify-center items-center bg-[#272932]">
          <div className="w-full max-w-md px-6 py-8">
            {children}
          </div>
        </div>
      {/* Left side (image) */}
      <div
        className="hidden lg:block w-3/5 bg-cover bg-center bg-gray-200"
        style={{
          backgroundImage: "url('/images/authImage.png')",
        }}
      ></div>

    </div>
  );
};

export default AuthLayout;
