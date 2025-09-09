import { Card, Empty, Spin } from "antd";
import { usePlayerStore } from "../stores/usePlayerStore";
import PlayerView from "../components/PlayerView";
import { useParams } from "react-router-dom";

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const { playlists, selectedPlaylistId, loading } = usePlayerStore();
  

  const fullPlaylist = playlists.find((p) => p.id === selectedPlaylistId) || null;

  if (loading) return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;

  if (!fullPlaylist) return <Card>Selecione uma playlist</Card>;

  if (fullPlaylist.medias.length === 0) {
        return (
            <div>
                <h2 style={{ paddingBottom: 16 }}>{fullPlaylist.nome}</h2>
                <Empty description="Esta playlist não possui mídias." />
            </div>
        );
    }
    
  return (
    <div>
      <h2 style={{paddingBottom: 16}}>{fullPlaylist.nome}</h2>
      <PlayerView playlist={fullPlaylist} />
    </div>
  );
}
