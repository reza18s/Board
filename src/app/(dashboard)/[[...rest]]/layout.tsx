import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar";
import { OrgSidebar } from "@/components/sidebar/org-sidebar";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    // <ConvexClientProvider>
    <main className="h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden ">
        <Sidebar></Sidebar>
        <OrgSidebar />
        {children}
      </div>
    </main>
    // </ConvexClientProvider>
  );
};

export default DashboardLayout;
