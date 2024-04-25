"use client";

import { ReactNode, useState } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { formations } from "@/positions/formations";
import Loading from "@/components/loading/loading";

export function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        formationSelectedId: null,
        formationName: null,
        searchClickedId: null,
        message: "",
      }}
      initialStorage={{
        players: new LiveList(),
        fieldPlayers: new LiveList(),
        formationIndexes: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
