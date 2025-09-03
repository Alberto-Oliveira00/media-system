import { create } from "zustand";
import type { Media } from "../types/media";
import * as mediaService from "../api/mediaService";

type State = {
    medias: Media[];
    loading: boolean;
    error?: string | null;
    fetchMedias: () => Promise<void>;
    addMedia: (fd: FormData) => Promise<Media| null>;
    updateMedia: (id: number, fd: FormData) => Promise<Media | null>;
    deleteMedia: (id: number) => Promise<boolean>;
};

export const useMediaStore = create<State>((set, get) => ({
    medias: [],
    loading: false,
    error: null,

    fetchMedias: async () => {
        set({ loading: true, error: null });
        try {
            const list = await mediaService.getMedias();
            set({ medias: list});
        } catch (err: any){
            set({ error: err?.message ?? "Erro ao carregar mídias" });
        } finally {
          set({ loading: false });
        }
    },

    addMedia: async (fd) => {
        try{
            const created = await mediaService.createMedia(fd);
            set((s) => ({ medias: [created, ...s.medias]}))
            return created;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    updateMedia: async (id, fd) => {
        try {
            const updated = await mediaService.updateMedia(id, fd);
            set((s) => ({ medias: s.medias.map(m => m.id === id ? updated : m) }));
            return updated;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    deleteMedia: async (id) => {
    try {
      await mediaService.deleteMedia(id);
      set((s) => ({ medias: s.medias.filter(m => m.id !== id) }));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
}))

