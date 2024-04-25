import {
  BaseUserMeta,
  LiveList,
  LiveObject,
  createClient,
} from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 16,
});

// const client = createClient({
//   authEndpoint: async (room) => {
//     const headers = {
//       // Custom headers

//       // ...

//       "Content-Type": "application/json",
//     };

//     const body = JSON.stringify({
//       // Custom body

//       // ...
//       room,
//     });

//     const response = await fetch("/api/liveblocks-auth", {
//       method: "POST",
//       headers,
//     });

//     return await response.json();
//   },
// });

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  cursor: { x: number; y: number } | null;
  formationSelectedId: string | null;
  formationName: string | null;
  searchClickedId: string | null;
  message: string | null;
};

// type Theme = "light" | "dark";

// export type Logo = {
//   message: string[];
//   theme: Theme;
// };

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  players: LiveList<LiveObject<any>>;
  fieldPlayers: LiveList<LiveObject<any>>;
  formationIndexes: LiveList<any>;
};

// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
// type UserMeta = BaseUserMeta;

type UserMeta = {
  info: {
    name: string;
    // color: [string, string];
    // avatar: string;
  };
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {
  // x: number | undefined;
  // y: number | undefined;
  value?: string;
  formationNameValue?: string;
};

// Optionally, when using Comments, ThreadMetadata represents metadata on
// each thread. Can only contain booleans, strings, and numbers.
export type ThreadMetadata = {
  // resolved: boolean;
  // quote: string;
  // time: number;
};

// Room-level hooks, use inside `RoomProvider`
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersListener,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
    useThreadSubscription,
    useMarkThreadAsRead,
    useRoomNotificationSettings,
    useUpdateRoomNotificationSettings,

    // These hooks can be exported from either context
    // useUser,
    // useRoomInfo
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);

// Project-level hooks, use inside `LiveblocksProvider`
// export const {
//   suspense: {
//     LiveblocksProvider,
//     useMarkInboxNotificationAsRead,
//     useMarkAllInboxNotificationsAsRead,
//     useInboxNotifications,
//     useUnreadInboxNotificationsCount,

//     // These hooks can be exported from either context
//     useUser,
//     useRoomInfo,
//   },
// } = createLiveblocksContext<UserMeta, ThreadMetadata>(client);
