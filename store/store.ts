import { create } from "zustand";
import {
  createUserPreferencesSlice,
  type UserPreferencesSlice,
} from "./slices";

export interface RootState {
  preferences: UserPreferencesSlice;
}

export const useStore = create<RootState>()((set) => ({
  preferences: createUserPreferencesSlice((partial) =>
    set((state) => ({ preferences: { ...state.preferences, ...partial } }))
  ),
}));
