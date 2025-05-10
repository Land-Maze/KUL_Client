import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import Footer from "@/components/Footer";
import SideMenubar from "@/components/Sidebar";
import { SharedProvider } from "@/context/SharedContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E KUL Alternative",
  description: "Alternative to E KUL with better UI and UX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen `}
      >
        <SidebarProvider>
          <SharedProvider>
            <SideMenubar />
            <div className="flex flex-col justify-between min-h-screen w-full">
              
              {children}

              <Toaster />
              <Footer />
            </div>
          </SharedProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
