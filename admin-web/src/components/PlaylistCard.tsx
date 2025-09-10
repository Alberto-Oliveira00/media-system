import { Card, Typography, Space, Button, message } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { Playlist } from "../types/playlist";
import { usePlaylistStore } from "../stores/usePlaylistStore";

const { Title, Text } = Typography;

type Props = {
  playlist: Playlist;
};

export default function PlaylistCard({ playlist }: Props) {
   const navigate = useNavigate();
   const setActiveForPlayer = usePlaylistStore((state) => state.setActiveForPlayer);
    
    const isActive = playlist.isActiveForPlayer;
    
   const handleCardClick = () => {
     navigate(`/playlist/${playlist.id}`);
    };

    const handleActiveClick = async (e: React.MouseEvent) => {
        e.stopPropagation(); 
        try {
            if (isActive) {
                message.info("Esta playlist já está ativa para o player.");
                return;
            }
            // Ação correta é chamada diretamente
            await setActiveForPlayer(playlist.id);
        } catch (error) {
            message.error("Erro ao ativar a playlist.");
            console.error(error);
        }
    };

  return (
      <Card
        hoverable
        onClick={handleCardClick}
        style={{ marginBottom: 16 }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {playlist.nome}
        </Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Criada em: {new Date(playlist.createdAt).toLocaleString()}
          </Text>
            <p>{playlist.descricao}</p>
            <Space style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Text strong>{playlist.medias.length} mídias</Text>
              <Button 
                type={isActive ? "primary" : "default"}
                onClick={handleActiveClick}
                icon={<PlayCircleOutlined />}
              >
                {isActive ? "Ativa" : "Ativar"}
              </Button>
            </Space>
      </Card>
  );
}