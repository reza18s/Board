"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Hint } from "@/components/global/hint";
import { Actions } from "@/components/global/actions";
import { useModal } from "@/stores/useModal";
import useStore from "@/stores/useStore";
import { RenameModal } from "@/components/modals/RenameModal";

interface InfoProps {
  boardId: string;
}

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const TabSeparator = () => <div className="px-1.5 text-neutral-300">|</div>;

export const Info = ({ boardId }: InfoProps) => {
  const model = useStore(useModal, (state) => state);

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) {
    return null;
  }

  return (
    <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-accent px-1.5 shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button
          asChild
          className="border border-primary/80 bg-secondary px-2 text-foreground/80  hover:bg-secondary"
        >
          <Link href="/">
            <Image src="/logo.svg" alt="Board logo" height={24} width={24} />
            <span
              className={cn(
                "ml-2 hidden text-xl  font-semibold md:flex",
                font.className,
              )}
            >
              BoardWex
            </span>
          </Link>
        </Button>
      </Hint>

      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          className="bg-primary/80 px-2 text-base font-semibold "
          onClick={() =>
            model?.setOpen(<RenameModal></RenameModal>, {
              BoardCard: { id: data._id, title: data.title },
            })
          }
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
        className=" "
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => (
  <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md" />
);
