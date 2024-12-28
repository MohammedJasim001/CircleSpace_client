"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where Sidebar should NOT appear
  const authRoutes = ["/auth/login", "/auth/register", "/auth/otp"];
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <div className="flex ">
      {/* Render Sidebar conditionally */}
      {!isAuthPage && <Sidebar />}
      <main className="flex-1 ">{children}</main>
    </div>
  );
}
