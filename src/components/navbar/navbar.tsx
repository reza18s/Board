"use client";

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";

import { SearchInput } from "../global/searchInput";
import { ModeToggle } from "../global/modeToggle";
import { InviteButton } from "../global/inviteButton";
import Link from "next/link";
import Image from "next/image";
import { cn, orgSwitchTheme } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });
export const Navbar = () => {
  const { organization } = useOrganization();
  const { theme } = useTheme();
  const variables = {
    colorPrimary: "#ffbf42",
    colorAlphaShade: "#ffbf42",
  };
  const orgTileStyles = orgSwitchTheme(theme);
  return (
    <div className=" flex items-center justify-between gap-x-4 bg-card p-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="Logo" height={28} width={28} />
          <span
            className={cn(
              "hidden text-2xl font-semibold md:flex",
              font.className,
            )}
          >
            BoardWex
          </span>
        </div>
      </Link>
      <div className="hidden justify-center lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="flex items-center gap-3">
        <div className=" lg:hidden">
          <OrganizationSwitcher hidePersonal appearance={orgTileStyles} />
        </div>
        {organization && <InviteButton />}
        <ModeToggle></ModeToggle>
        <UserButton appearance={{ variables }} />
      </div>
    </div>
  );
};
