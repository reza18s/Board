"use client";

import { BoardList } from "@/components/board/board-list";
import { EmptyOrg } from "@/components/empty/empty-org";
import { useOrganization } from "@clerk/nextjs";
interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();
  return (
    <div className="relative h-[calc(100%)] flex-1 overflow-scroll">
      <div className="pointer-events-none fixed z-[3] h-20 w-full bg-gradient-to-b from-background/50" />

      {!organization ? (
        <EmptyOrg />
      ) : (
        <div className="p-6">
          <BoardList orgId={organization.id} query={searchParams} />
        </div>
      )}
      <div className="pointer-events-none fixed bottom-0 z-[3] h-10 w-full bg-gradient-to-t from-background/50" />
    </div>
  );
};

export default DashboardPage;
