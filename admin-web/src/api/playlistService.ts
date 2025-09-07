import api from "./api";
import type { Playlist } from "../types/playlist";

export const getPlaylists = async (): Promise<Playlist[]> => {
    const { data } = await api.get<Playlist[]>("/playlist");
    return data;
}

export const getPlaylistById = async (id: number): Promise<Playlist> => {
    const { data } = await api.get<Playlist>(`/playlist/${id}`);
    return data;
}

export const createPlaylist = async (data: any) => {
    const { data: create } = await api.post("/playlist", data);
    return create;
}

export const updatePlaylist = async (id: number, data: any) => {
    const { data: update } = await api.put(`playlist/${id}`, data);
    return update;
}

export const deletePlaylist = async (id: number) => {
    await api.delete(`playlist/${id}`);
}

export const addMediaToPlaylist = async (playlistId: number, mediaId: number) => {
    await api.post(`/playlist/${playlistId}/medias/${mediaId}`);
}

export const removeMediaFromPlaylist = async (playlistId: number, mediaId: number) => {
    await api.delete(`playlist/${playlistId}/medias/${mediaId}`);
};