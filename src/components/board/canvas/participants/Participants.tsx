"use client";

import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./UserAvatar";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ModeToggle } from "@/components/global/modeToggle";

const MAX_SHOWN_USERS = 2;
export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute right-2 top-2 flex h-12 items-center rounded-md bg-accent p-3 shadow-md">
      <div className="mr-2 flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
          />
        ))}

        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
      <ModeToggle></ModeToggle>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute right-2 top-2 flex h-12 w-[100px] items-center rounded-md bg-white p-3 shadow-md" />
  );
};
