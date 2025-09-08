// src/pages/PlayerPage.tsx
import { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { usePlayerStore } from "../stores/usePlayerStore";
import PlayerView from "../components/PlayerView";
import * as playerService from "../api/playerService";
import type { Playlist } from "../types/playlist";

export default function PlayerPage() {
  const { playlists, selectedPlaylistId, loadActivePlaylists } = usePlayerStore();
  const [fullPlaylist, setFullPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // garante que a lista de playlists está carregada
    loadActivePlaylists();
  }, [loadActivePlaylists]);

  useEffect(() => {
    const load = async () => {
      if (!selectedPlaylistId) {
        setFullPlaylist(null);
        return;
      }

      // tenta encontrar playlist com medias na cache
      const cached = playlists.find((p) => p.id === selectedPlaylistId);
      if (cached && cached.medias && cached.medias.length > 0) {
        setFullPlaylist(cached);
        return;
      }

      // senão, busca o detalhe do endpoint
      try {
        setLoading(true);
        const p = await playerService.getPlaylistById(selectedPlaylistId);
        setFullPlaylist(p);
      } catch (err) {
        console.error("Erro ao carregar playlist completa", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedPlaylistId, playlists]);

  if (loading) return <Spin />;

  if (!fullPlaylist) return <Card>Selecione uma playlist</Card>;

  return (
    <div>
      <h2 style={{paddingBottom: 16}}>{fullPlaylist.nome}</h2>
      <PlayerView playlist={fullPlaylist} />
    </div>
  );
}
