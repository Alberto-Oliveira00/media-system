import type { Playlist } from "../types/playlist";
import api from "./api";

export const getActivePlaylist = async (): Promise<Playlist | null> => {
    const { data } = await api.get<Playlist>("/playlist/active");
    return data;
};