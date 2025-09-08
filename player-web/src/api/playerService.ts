import type { Playlist } from "../types/playlist";
import api from "./api";

export const getActivePlaylists = async (): Promise<Playlist[]> => {
    const { data } = await api.get<Playlist[]>("/playlist/active");
    return data;
};

export const getPlaylistById = async (id: number): Promise<Playlist | null> => {
    const { data } = await api.get<Playlist>(`/playlist/${id}`);
    return data;
}