"use client";
import { create } from "zustand";

interface IdentityState {
    identity: string | null;
    setIdentity: (identity: string) => void;
}

const useIdentityStore = create<IdentityState>((set) => ({
    identity: null,
    setIdentity: (identity) => set({ identity }),
}));

export default useIdentityStore;
