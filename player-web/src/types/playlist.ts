import type { Media } from "./media";

export type Playlist = {
    id: number;
    nome: string;
    descricao?: string | null;
    isActiveForPlayer: boolean;
    medias: Media[];
}