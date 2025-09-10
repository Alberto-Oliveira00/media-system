import { useEffect, useState } from "react";
import { Button, Spin, Row, Col, Empty } from "antd";
import type { Playlist } from "../types/playlist";
import { usePlaylistStore } from "../stores/usePlaylistStore";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistForm from "../components/PlaylistForm";

export default function Playlists() {
    const { playlists, loading, fetchPlaylists, addPlaylist, updatePlaylist } = usePlaylistStore();
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
            fetchPlaylists();
            setOpen(false);
            setEditing(null);
        }
    };

    if (loading) return <Spin />;

    if (playlists.length === 0) {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <h2>Playlists</h2>
                    <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>
                        Adicionar playlist
                    </Button>
                </div>
                <Empty description="Nenhuma playlist encontrada." style={{ marginTop: 50 }} />
                <PlaylistForm open={open} editing={editing} onClose={() => { setOpen(false); setEditing(null); }} onSubmit={handleCreateOrUpdate} />
            </div>
        );
    }

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
        </div>
    );
}