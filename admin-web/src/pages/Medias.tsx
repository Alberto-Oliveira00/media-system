import { useEffect, useState } from "react";
import { Button, Col, Empty, Row, Spin } from "antd";
import MediaForm from "../components/MediaForm";
import { useMediaStore } from "../stores/useMediaStore";
import type { Media } from "../types/media";
import MediaCard from "../components/MediaCard";

export default function Medias(){
    const { medias, loading, fetchMedias, addMedia, updateMedia, deleteMedia } = useMediaStore();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Media | null>(null);

    useEffect(() => {
        fetchMedias();
    }, [fetchMedias]);

    const handleCreateOrUpdate = async (fd: FormData, editingId?: number) => {
        let success = false;
        if (editingId) {
            success = await updateMedia(editingId, fd);
        } else {
            success = await addMedia(fd);
        }

        if (success) {
            setOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteMedia(id);
    };

    if (loading) return <Spin />

    if (medias.length === 0) {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <h2>Mídias</h2>
                    <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>Adicionar mídia</Button>
                </div>
                <Empty description="Nenhuma mídia encontrada." style={{ marginTop: 50 }} />
                <MediaForm open={open} editing={editing} onClose={() => setOpen(false)} onSubmit={handleCreateOrUpdate} />
            </div>
        );
    }

    return(
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Mídias</h2>
                <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>Adicionar midia</Button>
            </div>

            <Row gutter={[16, 16]}>
                {medias.map(m => (
                    <Col xs={24} sm={12} md={8} lg={6} key={m.id}>
                        <MediaCard 
                            media={m} 
                            onEdit={(media) => { setEditing(media); setOpen(true); }}
                            onDelete={handleDelete}
                        />
                    </Col>
                ))}
            </Row>


            <MediaForm open={open} editing={editing} onClose={() => setOpen(false)} onSubmit={handleCreateOrUpdate} />
        </div>
    );
}