"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "./footer";
import { Overlay } from "./overlay";

import { useApiMutation } from "@/hooks/use-api-mutation";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite,
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="bg-amber-50 relative flex-1">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute right-1 top-1 rounded-md bg-white px-1 py-0.5 opacity-0 shadow-sm outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal className="text-amber opacity-75 transition-opacity hover:opacity-100" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};