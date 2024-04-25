import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/user-slices";
import { formationSlice, playerSlice } from "./slices/room-slices";

export const store = configureStore({
  reducer: {
    user: userSlices,
    formation: formationSlice.reducer,
    player: playerSlice.reducer,
  },
});
