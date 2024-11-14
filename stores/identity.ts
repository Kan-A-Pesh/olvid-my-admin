"use client";
import { create } from "zustand";

interface IdentityState {
    identity: bigint | null;
    setIdentity: (identity: bigint) => void;
}

const useIdentityStore = create<IdentityState>((set) => ({
    identity: null,
    setIdentity: (identity) => set({ identity }),
}));

export default useIdentityStore;
