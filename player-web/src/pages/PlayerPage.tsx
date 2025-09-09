import { useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import PlayerView from "../components/PlayerView";
import { Spin, Empty, Typography } from "antd";

const { Title } = Typography;

export default function PlayerPage() {
    const { activePlaylist, loading, loadActivePlaylist } = usePlayerStore();

    useEffect(() => {
        loadActivePlaylist();
        
    }, [loadActivePlaylist]);

    if (loading && !activePlaylist) {
        return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    }

    if (!activePlaylist) {
        return (
            <Empty
                description={
                    <Title level={4}>Nenhuma playlist ativa encontrada.</Title>
                }
                style={{ padding: '100px 0' }}
            />
        );
    }

    if (!activePlaylist.medias || activePlaylist.medias.length === 0) {
        return (
            <Empty
                description={
                    <Title level={4}>A playlist ativa não possui mídias.</Title>
                }
                style={{ padding: '100px 0' }}
            />
        );
    }

    return <PlayerView playlist={activePlaylist} />;
}