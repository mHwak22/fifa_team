import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormationProps {
  formationState: string;
  playerSelect: {
    playerState: number;
    playerIndex: any;
    swappingState: boolean;
  };
}

const formationInitialState: FormationProps = {
  formationState: "4-3-3-1",
  playerSelect: {
    playerState: 0,
    playerIndex: null,
    swappingState: false,
  },
};

const playerInitialState: FormationProps = {
  formationState: "4-3-3-1",
  playerSelect: {
    playerState: 0,
    playerIndex: null,
    swappingState: false,
  },
};

export const formationSlice = createSlice({
  name: "formation",
  initialState: formationInitialState,
  reducers: {
    saveFormation: (state, action: PayloadAction<string>) => {
      state.formationState = action.payload;
    },
  },
});

export const playerSlice = createSlice({
  name: "player",
  initialState: playerInitialState,
  reducers: {
    savePlayer: (state, action: PayloadAction<any>) => {
      state.playerSelect.playerState = action.payload.playerState;
      state.playerSelect.playerIndex = action.payload.playerIndex;
      state.playerSelect.swappingState = action.payload.swappingState;
    },
  },
});

export const { saveFormation } = formationSlice.actions;
export const { savePlayer } = playerSlice.actions;

export default {
  formation: formationSlice.reducer,
  player: playerSlice.reducer,
};
