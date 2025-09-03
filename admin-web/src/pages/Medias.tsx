import { useEffect, useState } from "react";
import { Button, message, Spin } from "antd";
import MediaTable from "../components/MediaTable";
import MediaForm from "../components/MediaForm";
import { useMediaStore } from "../stores/useMediaStore";
import type { Media } from "../types/media";

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

    return(
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Mídias</h2>
                <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>Adicionar midia</Button>
            </div>

            <MediaTable 
                data={medias} 
                onEdit={(m) => { setEditing(m); setOpen(true); }}
                onDelete={handleDelete} 
            />

            <MediaForm open={open} editing={editing} onClose={() => setOpen(false)} onSubmit={handleCreateOrUpdate} />
        </div>
    );
}