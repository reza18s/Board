"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import { orgSwitchTheme } from "@/lib/utils";

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  const { theme } = useTheme();

  const orgTileStyles = orgSwitchTheme(theme);

  return (
    <div className="hidden w-[230px] flex-col space-y-6 bg-card  px-5 pt-5 lg:flex">
      <OrganizationSwitcher hidePersonal appearance={orgTileStyles} />
      <div className="w-full space-y-1 ">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link href="/">
            <LayoutDashboard className="mr-2 size-4 stroke-primary" />
            Team boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="w-full justify-start px-2 font-normal"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="mr-2 size-4 stroke-primary" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
