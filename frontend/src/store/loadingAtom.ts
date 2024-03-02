import { atom } from "recoil";

export const loadingAtom = atom({
  key: "loadingAtom",
  default: {
    isLoading: false,
    error: null,
  },
});
