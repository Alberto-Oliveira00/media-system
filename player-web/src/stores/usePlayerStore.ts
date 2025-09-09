import { create } from "zustand";
import type { Playlist } from "../types/playlist";
import * as playerService from "../api/playerService";
import { message } from "antd";
import type { AxiosError } from "axios";

type State = {
  activePlaylist: Playlist | null;
  loading: boolean;
  currentIndex: number;
  playing: boolean;
  imageDuration: number;
  loadActivePlaylist: () => Promise<void>;
  setIndex: (i: number) => void;
  next: () => void;
  prev: () => void;
  play: () => void;
  pause: () => void;
  setImageDuration: (s: number) => void;
};

export const usePlayerStore = create<State>((set, get) => ({
  activePlaylist: null,
  loading: false,
  currentIndex: 0,
  playing: true,
  imageDuration: 5,

  loadActivePlaylist: async () => {
    set({ loading: true });
    try {
      const activePlaylist = await playerService.getActivePlaylist();
      set({
        activePlaylist,
        currentIndex: 0,
        playing: activePlaylist!== null,
      });
    } catch (err) {
      const error = err as AxiosError;
      message.error(`Erro ao carregar playlists ativas: ${error?.message ?? ""}`);
    } finally {
      set({ loading: false });
    }
  },

  setIndex: (i) => {
    const { activePlaylist } = get();
        if (!activePlaylist || !activePlaylist.medias.length) return;

        // Garante que o índice esteja dentro dos limites
        const newIndex = Math.max(0, Math.min(i, activePlaylist.medias.length - 1));
        set({ currentIndex: newIndex });
  },

  next: () => {
    const { activePlaylist, currentIndex } = get();
    if(!activePlaylist || !activePlaylist.medias || activePlaylist.medias.length === 0)
      return;
    const nextIndex = (currentIndex + 1) % activePlaylist.medias.length;
    set({ currentIndex: nextIndex });
  },

  prev: () => {
    const { activePlaylist, currentIndex } = get();
    if(!activePlaylist || !activePlaylist.medias || activePlaylist.medias.length === 0)
      return;
    const prevIndex = (currentIndex - 1 + activePlaylist.medias.length) % activePlaylist.medias.length;
    set({ currentIndex: prevIndex });
  },

  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  setImageDuration: (s) => set({ imageDuration: s }),
}));
