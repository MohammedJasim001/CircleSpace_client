"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
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

  const navbarOnlyHiddenRoutes = ['/messages'];
  const shouldHideNavbarOnly = navbarOnlyHiddenRoutes.includes(pathname);

  return (
    <div >
      {/* Render Sidebar conditionally */}
      {!isAuthPage && <Sidebar />}
      {!(isAuthPage || shouldHideNavbarOnly) && <Navbar />}
      <main className="flex-1 ml-0 md:ml-36 ">
  {children}
</main>
    </div>
  );
}
