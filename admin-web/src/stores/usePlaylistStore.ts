import { create } from "zustand";
import type { Playlist } from "../types/playlist";
import * as playlistService from "../api/playlistService";
import { message } from "antd";
import { AxiosError } from "axios";

type State = {
    playlists : Playlist[];
    loading: boolean;
    error?: string | null;
    fetchPlaylists: () => Promise<void>;
    addPlaylist: (data: any) => Promise<boolean>;
    getPlaylistById: (id: number) => Promise<Playlist | null>;
    updatePlaylist: (id: number, data: any) => Promise<boolean>;
    deletePlaylist: (id: number) => Promise<boolean>;
    setActiveForPlayer: (id: number) => Promise<boolean>;
    addMediaToPlaylist: (playlistId: number, mediaId: number) => Promise<boolean>;
    deleteMediaFromPlaylist: (playlistId: number, mediaId: number) => Promise<boolean>;
}

export const usePlaylistStore = create<State>((set, get) =>({
    playlists: [],
    loading: false,
    error: null,

    fetchPlaylists: async () => {
        set({ loading: true, error: null });
        try {
            const list = await playlistService.getPlaylists();
            set({ playlists: list });
        } catch(err) {
            const error = err as AxiosError;
            set({ error: error.message });
            message.error("Erro ao carregar playlists");
        } finally {
            set({ loading: false })
        }
    },
    getPlaylistById: async (id: number) => {
        set({ loading: true });
        try{
            const playlist = await playlistService.getPlaylistById(id);
            return playlist;
        } catch (err) {
            const error = err as AxiosError;
            message.error(`Erro ao carregar playlist: ${error.message}`);
            return null;
        } finally {
            set({ loading: false });
        }
    },

    addPlaylist: async (data) => {
        set({ loading: true });
        try {
            const create = await playlistService.createPlaylist(data);
            set((s) => ({ playlists: [create, ...s.playlists] }));
            message.success("Playlist criada com sucesso!");
            return true;
        } catch(err) {
            const error = err as AxiosError;
            message.error(`Erro ao criar playlist: ${error.message}`);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    updatePlaylist: async (id, data) => {
        set ({ loading: true});
        try {
            const update = await playlistService.updatePlaylist(id, data);
            set((s) => ({
                playlists: s.playlists.map(p => (p.id === id ? update : p))
            }));
            message.success("Playlist atualizada com sucesso!");
            return true;
        } catch (err) {
            const error = err as AxiosError;
            message.error(`Erro ao atualizar playlist: ${error.message}`);
            return false;
        } finally {
            set({ loading: false });
        }
    },

    deletePlaylist: async (id) => {
        set({ loading: true });
        try {
            await playlistService.deletePlaylist(id);
            set((s) => ({ playlists: s.playlists.filter(p => p.id !== id )}));
            message.success("Playlist deletada com sucesso!");
            return true;
        } catch(err){
            const error = err as AxiosError;
            message.error(`Erro ao deletar playlist: ${error.message}`);
            return false;
        } finally {
            set({ loading: false });
        }
    },
    
    setActiveForPlayer: async (id: number) => {
        set({ loading: true });
        try {
            await playlistService.activePlaylist(id);
            await get().fetchPlaylists(); 
            message.success("Playlist ativada com sucesso!");
            return true;
        } catch (err){
            const error = err as AxiosError;
            message.error(`Erro ao ativar playlist: ${error.message}`);
            return false;
        }finally {
            set({ loading: false });
        }

    
    },

    addMediaToPlaylist: async (playlistId, mediaId) => {
        set({ loading: true });
        try {
            await playlistService.addMediaToPlaylist(playlistId, mediaId);
            const update = await playlistService.getPlaylistById(playlistId);
            set((s) => ({
                playlists: s.playlists.map(p => p.id === playlistId ? update : p)
            }));
            message.success("Mídia adicionada a playlist!");
            return true;
        } catch (err) {
            const error = err as AxiosError;
            message.error(`Erro ao adicionar mídia: ${error.message}`);
            return false;
        } finally {
            set ({ loading: false });
        }
    },

    deleteMediaFromPlaylist: async (playlistId, mediaId) => {
        set({ loading: true });
        try {
            await playlistService.removeMediaFromPlaylist(playlistId, mediaId);
            const update = await playlistService.getPlaylistById(playlistId);
            set((s) => ({
                playlists: s.playlists.map(p => p.id === playlistId ? update : p)
            }));
            message.success("Mídia removida da playlist!");
            return true;
        } catch (err) {
            const error = err as AxiosError;
            message.error(`Erro ao remover mídia: ${error.message}`);
            return false;
        } finally {
            set({ loading: false });
        }
    }
}));