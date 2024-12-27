import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utils/provider/reactQuaryProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CircleSpace",
  description: "social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReactQueryProvider>
        {children}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </ReactQueryProvider>
        </body>
    </html>
  );
}