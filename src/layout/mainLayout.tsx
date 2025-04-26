"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true); // Set to true when the component is mounted on the client
  }, []);

  // If the component isn't mounted yet (during SSR), don't render anything
  if (!isClient) {
    return null; // Prevents hydration error
  }

  // Define routes where Sidebar should NOT appear
  const authRoutes = ["/auth/login", "/auth/register", "/auth/otp"];
  const isAuthPage = authRoutes.includes(pathname);

  const whenMessages = pathname.startsWith("/messages") 
  const whenSettings =  pathname.startsWith("/settings");

  return (
    <div>
      {/* Sidebar - only visible on md and up */}
      {!isAuthPage && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* Footer - only visible below md */}
      {!(isAuthPage || whenMessages ) && (
        <div className="block md:hidden ">
          <Footer />
        </div>
      )}

      {/* Navbar */}
      {!(isAuthPage || whenMessages || whenSettings) && <Navbar />}

      <main className="flex-1 ml-0 md:ml-36">{children}</main>
    </div>
  );
}
