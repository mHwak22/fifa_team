"use client"; // Using client

// Importing necessary hooks and components
import {
  useBroadcastEvent,
  useEventListener,
  useMutation,
  useMyPresence,
  useOthersListener,
  useStorage,
  useUpdateMyPresence,
} from "@/liveblocks.config"; // Custom Liveblocks configuration

import React, { useEffect, useRef, useState } from "react"; // React imports
import { useUser } from "@clerk/nextjs"; // User authentication hook

import { message, Input, Tag } from "antd"; // Ant Design components
import useInterval from "@/hooks/useInterval"; // Custom interval hook

import { formations } from "@/positions/formations"; // Formations data import
import { Cursor } from "./cursor"; // Cursor component
import FootballField from "../footballField"; // Football field component
import SearchPlayer from "../player/searchPlayer"; // Player search component
import FormationSelect from "../formationSelect"; // Formation select component

// Type definitions
type Presence = any;
type LiveCursorProps = {
  others: any;
};

type Position = {
  x: number;
  y: number;
};

// Function component definition
function LiveModules({ others }: LiveCursorProps) {
  // State variables initialization
  const userCount = others.length;
  const updateMyPresence = useUpdateMyPresence();
  const { user } = useUser();
  const [keyState, setKeyState] = useState("Escape");
  // const [message, setMessage] = useState("");
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const inputRef: any = useRef(null);
  const broadcast = useBroadcastEvent();
  const [messageApi, contextHolder] = message.useMessage();

  // Effect hook for focusing input field on mount and handling keyboard events
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    function oneKeyDown(event: KeyboardEvent) {
      if (event.key === "/") {
        setKeyState(event.key);
      } else if (event.key === "Escape") {
        setKeyState(event.key);
      }
    }
    window.addEventListener("keydown", oneKeyDown);

    return () => {
      window.removeEventListener("keydown", oneKeyDown);
    };
  }, [inputRef.current]);

  // Function to handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    await updateMyPresence({ message: e.target[0].value });

    broadcast({
      value: e.target[0].value,
    });
  }

  // Interval hook for resetting chat message
  useInterval(async () => {
    await updateMyPresence({ message: "" });
  }, 12000);

  const roomAction = (user: any, action: string) => {
    if (action === "enter") {
      messageApi.info(`${user.info.name} entered the room`);
    } else {
      messageApi.info(`${user.info.name} left the room`);
    }
  };

  useOthersListener(({ type, user, others }) => {
    switch (type) {
      case "enter":
        roomAction(user, "enter");

        break;

      case "leave":
        roomAction(user, "leave");

        break;
    }
  });

  // Component rendering
  return (
    <div
      className="w-screen h-screen"
      // Handling pointer events to update cursor position
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } });
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {/* Rendering chat input form when '/' key is pressed */}
      {keyState === "/" && (
        <form onSubmit={handleSubmit}>
          <div className="flex absolute z-50 mt-6">
            <Input
              ref={inputRef}
              placeholder="Say something...."
              className="rounded-lg text-xs p-2 caret-white text-white"
              style={{
                transform: `translateX(${position.x}px) translateY(${position.y}px)`,
                background: `rgb(63,94,251)`,
                color: "white",
              }}
            />
          </div>
        </form>
      )}

      {/* Rendering cursors for other users */}
      {others.map(({ connectionId, presence, info }: any) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            connectionId={connectionId}
            name={info.name}
            keyState={keyState}
            others={others}
            presence={presence}
            updateMyPresence={updateMyPresence}
          />
        ) : null
      )}

      <div className="flex">
        <div>
          <div className="absolute z-50 p-1">
            <Tag color="green">Total players: {userCount}</Tag>
          </div>
          {contextHolder}

          {/* Rendering football field component */}
          <FootballField formation={formations} />
        </div>

        {/* Rendering side panel with player search and formation select */}
        <aside className="absolute right-0 flex flex-col justify-center items-center mt-0 m-24 gap-8">
          <SearchPlayer />
          <FormationSelect />
        </aside>
      </div>
    </div>
  );
}

export default LiveModules; // Exporting the component
