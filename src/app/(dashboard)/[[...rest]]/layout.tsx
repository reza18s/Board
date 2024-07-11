import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ConvexClientProvider>
      <main className="h-full">
        <Sidebar />
        <div className="h-full xs:pl-[60px]">
          <div className="flex h-full gap-x-3">
            {/* <OrgSidebar /> */}
            <div className="h-full flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </main>
    </ConvexClientProvider>
  );
};

export default DashboardLayout;
