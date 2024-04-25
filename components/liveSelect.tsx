import { connectionIdToColor } from "@/lib/utils";
import { useOthers } from "@/liveblocks.config";
import { useUser } from "@clerk/nextjs";
import LiveSelectColor from "./liveSelectColor";

function LiveSelect({ id }: { id: string }) {
  const others = useOthers();
  const { user } = useUser();
  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (presence.formationSelectedId === id) {
          return (
            <LiveSelectColor
              key={connectionId}
              name={user?.fullName}
              color={connectionIdToColor(connectionId)}
            />
          );
        }
      })}
    </>
  );
}

export default LiveSelect;
