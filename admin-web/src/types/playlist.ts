import type { Media } from "./media";

export type Playlist = {
    id: number,
    nome: string,
    descricao?: string
    isActiveForPlayer: boolean;
    createdAt: string;
    medias: Media[];
}