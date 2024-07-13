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
    <div className="h-[calc(100%-80px)] flex-1 p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
