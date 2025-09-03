import { create } from "zustand";
import type { Media } from "../types/media";
import * as mediaService from "../api/mediaService";
import { message } from "antd";
import { AxiosError } from "axios";

type State = {
    medias: Media[];
    loading: boolean;
    error?: string | null;
    fetchMedias: () => Promise<void>;
    addMedia: (fd: FormData) => Promise<boolean>;
    updateMedia: (id: number, fd: FormData) => Promise<boolean>;
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
            message.error("Erro ao carregar mídias");
        } finally {
          set({ loading: false });
        }
    },

    addMedia: async (fd) => {
        try{
            const created = await mediaService.createMedia(fd);
            set((s) => ({ medias: [created, ...s.medias] }));
            message.success("Mídia criada com sucesso");
            return true;
        } catch (error) {
            const err = error as AxiosError;
            message.error(`Erro ao criar mídia: ${err.response?.data}`);
            return false;
        }
    },

    updateMedia: async (id, fd) => {
        try {
            const updated = await mediaService.updateMedia(id, fd);
            set((s) => ({ medias: s.medias.map(m => m.id === id ? updated : m) }));
            message.success("Mídia atualizada com sucesso!");
            return true;
        } catch (error) {
            const err = error as AxiosError;
            message.error(`Erro ao atualizar mídia: ${err.response?.data}`);
            return false;
        }
    },

    deleteMedia: async (id) => {
        try {
            await mediaService.deleteMedia(id);
            set((s) => ({ medias: s.medias.filter(m => m.id !== id) }));
            message.success("Mídia deletada com sucesso!");
            return true;
        } catch (err) {
            const error = err as AxiosError;
            message.error(`Erro ao deletar mídia: ${error.response?.data}`);
            return false;
        }
    },
}));

