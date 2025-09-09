import { create } from "zustand";
import type { Playlist } from "../types/playlist";
import * as playerService from "../api/playerService";
import { message } from "antd";
import type { AxiosError } from "axios";

type State = {
  playlists: Playlist[];
  loading: boolean;
  selectedPlaylistId?: number | null;
  currentIndex: number;
  playing: boolean;
  imageDuration: number;
  loadActivePlaylists: () => Promise<void>;
  selectPlaylist: (id: number) => void;
  setIndex: (i: number) => void;
  next: () => void;
  prev: () => void;
  play: () => void;
  pause: () => void;
  setImageDuration: (s: number) => void;
};

export const usePlayerStore = create<State>((set, get) => ({
  playlists: [],
  loading: false,
  selectedPlaylistId: null,
  currentIndex: 0,
  playing: true,
  imageDuration: 5,

  loadActivePlaylists: async () => {
    set({ loading: true });
    try {
      const list = await playerService.getActivePlaylists();
      set({ playlists: list });

      const sel = get().selectedPlaylistId;
      if (!sel && list.length > 0) {
        set({ selectedPlaylistId: list[0].id, currentIndex: 0 });
      }

      if (sel && !list.find((p) => p.id === sel)) {
        set({ selectedPlaylistId: list.length ? list[0].id : null, currentIndex: 0 });
      }
    } catch (err) {
      const error = err as AxiosError;
      message.error(`Erro ao carregar playlists ativas: ${error?.message ?? ""}`);
    } finally {
      set({ loading: false });
    }
  },

  selectPlaylist: (id) => {
    set({ selectedPlaylistId: id, currentIndex: 0 });
  },

  setIndex: (i) => set({ currentIndex: i }),

  next: () => {
    const { playlists, selectedPlaylistId, currentIndex } = get();
    const pl = playlists.find((p) => p.id === selectedPlaylistId);
    if (!pl || !pl.medias || pl.medias.length === 0) 
      return;
    const nextIndex = (currentIndex + 1) % pl.medias.length;
    set({ currentIndex: nextIndex });
  },

  prev: () => {
    const { playlists, selectedPlaylistId, currentIndex } = get();
    const pl = playlists.find((p) => p.id === selectedPlaylistId);
    if (!pl || !pl.medias || pl.medias.length === 0) 
      return;
    const prevIndex = (currentIndex - 1 + pl.medias.length) % pl.medias.length;
    set({ currentIndex: prevIndex });
  },

  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),

  setImageDuration: (s) => set({ imageDuration: s }),
}));
