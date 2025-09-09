import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaylistStore } from "../stores/usePlaylistStore";
import { Spin, Typography, Button, Popconfirm } from "antd";
import PlaylistMedias from "../components/PlaylistMedias";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function PlaylistDetails() {
    const { id } = useParams();
    const playlistId = Number(id);
    const navigate = useNavigate();

    const { playlists, loading, deletePlaylist, fetchPlaylists } = usePlaylistStore();
    const playlist = playlists.find(p => p.id === playlistId);

    useEffect(() => {
        if (playlists.length === 0 && !loading) {
            fetchPlaylists();
        }
    }, [playlists.length, loading, fetchPlaylists]);


    const handleDelete = async () => {
        const sucess = await deletePlaylist(playlistId);
        if (sucess){
            navigate('/playlist');
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    }

    if (!playlist) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Typography.Title level={4}>Playlist não encontrada ou foi excluída.</Typography.Title>
                <Button onClick={() => navigate('/playlist')}>Voltar</Button>
            </div>
        );
    }
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Button onClick={() => navigate('/playlist')}>Voltar</Button>
                <Popconfirm title="Tem certeza que deseja excluir esta playlist?" onConfirm={handleDelete}>
                    <Button type="primary" danger icon={<DeleteOutlined />}>Excluir Playlist</Button>
                </Popconfirm>
            </div>
            <Title level={2}>{playlist.nome}</Title>
            <p style={{ marginBottom: 12}}>{playlist.descricao}</p>
            <PlaylistMedias playlist={playlist} />
        </div>
    );
}