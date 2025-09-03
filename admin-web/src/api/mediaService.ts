import api from "./api";
import type { Media } from "../types/media";

export const getMedias = async (): Promise<Media[]> => {
    const { data } = await api.get<Media[]>("/media");
    return data;
};

export const createMedia = async (formData: FormData) => {
    const { data } = await api.post("/media", formData)
    return data;
};

export const updateMedia = async (id: number, formData: FormData) => {
    const { data } = await api.put(`media/${id}`, formData)
    return data;
};

export const deleteMedia = async (id: number) => {
    await api.delete(`media/${id}`)
}