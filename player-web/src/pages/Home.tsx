import { useEffect } from "react";
import { Row, Col, Spin, Empty } from "antd";
import { usePlayerStore } from "../stores/usePlayerStore";
import PlaylistCard from "../components/PlaylistCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { playlists, loading, loadActivePlaylists, selectPlaylist } = usePlayerStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadActivePlaylists();
  }, [loadActivePlaylists]);

  const handleSelect = (id: number) => {
    selectPlaylist(id);
    navigate("/player");
  };

  if (loading)
     return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;

  if (!playlists || playlists.length === 0) 
    return <Empty description="Nenhuma playlist ativa" />;

  return (
    <Row gutter={[16, 16]}>
      {playlists.map((p) => (
        <Col key={p.id}>
          <PlaylistCard playlist={p} onSelect={handleSelect} />
        </Col>
      ))}
    </Row>
  );
}
