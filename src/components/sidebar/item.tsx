"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "../global/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) {
      return;
    }
    setActive({ organization: id });
  };

  return (
    <div
      className={cn(
        "relative aspect-square cursor-pointer rounded-[8px] border-2 border-transparent opacity-75 transition hover:opacity-100",
        isActive && "border-white p-[1px] opacity-100",
      )}
    >
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          alt={name}
          src={imageUrl}
          onClick={onClick}
          width={32}
          height={32}
          className="size-full rounded-[5px]"
        />
      </Hint>
    </div>
  );
};
