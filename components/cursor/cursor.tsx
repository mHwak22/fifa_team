import { connectionIdToColor } from "@/lib/utils";
import { useEventListener } from "@/liveblocks.config";

import cursor from "@/public/cursor.svg";
import { Input } from "antd";
import { useEffect } from "react";

export function Cursor({
  x,
  y,
  connectionId,
  name,
  keyState,
  others,
  presence,
  updateMyPresence,
}: any) {
  // console.log(presence);
  return (
    <>
      <svg
        style={{
          position: "absolute",
          zIndex: 50,
          left: 0,
          top: 0,
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={connectionIdToColor(connectionId)}
          stroke="black"
        />
      </svg>
      {presence.message === "" && (
        <div className="flex absolute z-50 mt-6">
          <p
            className="rounded-lg text-xs p-2 font-bold"
            style={{
              transform: `translateX(${x}px) translateY(${y}px)`,
              background: `${connectionIdToColor(connectionId)}`,
            }}
          >
            {name}
          </p>
        </div>
      )}

      {/* ////Render other user message */}
      {presence.message !== "" &&
        others.map(({ connectionId, presence }: any) =>
          presence.cursor ? (
            <div key={connectionId} className="flex absolute z-50 mt-6">
              <p
                className="rounded-lg text-xs p-2"
                style={{
                  transform: `translateX(${x}px) translateY(${y}px)`,
                  background: `${connectionIdToColor(connectionId)}`,
                }}
              >
                {presence.message}
              </p>
            </div>
          ) : null
        )}
    </>
  );
}
