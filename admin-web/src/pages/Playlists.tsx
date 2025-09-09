import { useEffect, useState } from "react";
import { Button, Spin, Row, Col } from "antd";
import type { Playlist } from "../types/playlist";
import { usePlaylistStore } from "../stores/usePlaylistStore";
import PlaylistCard from "../components/PlaylistCard"; // Novo componente
import PlaylistForm from "../components/PlaylistForm";
import PlaylistMedias from "../components/PlaylistMedias"; // Usaremos em outro local

export default function Playlists() {
    const { playlists, loading, fetchPlaylists, addPlaylist, updatePlaylist, deletePlaylist } = usePlaylistStore();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Playlist | null>(null);

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const handleCreateOrUpdate = async (data: any, editingId?: number) => {
        let success = false;
        if (editingId) {
            success = await updatePlaylist(editingId, data);
        } else {
            success = await addPlaylist(data);
        }

        if (success) {
            fetchPlaylists(); // Recarrega a lista após sucesso
            setOpen(false);
            setEditing(null);
        }
    };

    if (loading) return <Spin />;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Playlists</h2>
                <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>
                    Adicionar playlist
                </Button>
            </div>

            <Row gutter={[16, 16]}>
                {playlists.map(p => (
                    <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
                        <PlaylistCard playlist={p} />
                    </Col>
                ))}
            </Row>

            <PlaylistForm
                open={open}
                editing={editing}
                onClose={() => { setOpen(false); setEditing(null); }}
                onSubmit={handleCreateOrUpdate}
            />
            {/* O componente PlaylistMedias não é mais um modal, será uma página */}
        </div>
    );
}