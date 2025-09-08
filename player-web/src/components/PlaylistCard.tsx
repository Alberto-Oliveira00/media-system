// src/components/PlaylistCard.tsx
import { Card } from "antd";
import type { Playlist } from "../types/playlist";

type Props = {
  playlist: Playlist;
  onSelect: (id: number) => void;
};

export default function PlaylistCard({ playlist, onSelect }: Props) {
  return (
      <Card
        hoverable
        title={playlist.nome}
        style={{ width: 300 }}
        onClick={() => onSelect(playlist.id)}
      >
        <div style={{ minHeight: 60 }}>
          <p style={{ margin: 0 }}>{playlist.descricao}</p>
        </div>
      </Card>
  );
}
