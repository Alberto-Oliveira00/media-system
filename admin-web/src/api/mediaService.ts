import api from "./api";
import type { Media } from "../types/media";

export const getMedias = async (): Promise<Media[]> => {
    const { data } = await api.get<Media[]>("/media");
    return data;
};