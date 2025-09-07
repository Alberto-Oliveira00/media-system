import type { Media } from "./media";

export type Playlist = {
    id: number,
    nome: string,
    descricao?: string
    isActivePlayer: boolean;
    createdAt: string;
    medias: Media[];
}