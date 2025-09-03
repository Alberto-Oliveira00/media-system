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
        fetchMedias().catch(() => message.error("Erro ao carregar mídias"));
    }, []);

    const handleCreateOrUpdate = async (fd: FormData, editingId?: number) => {
        if(editingId){
            await updateMedia(editingId, fd);
        } else {
            await addMedia(fd);
        }
    };

    const handleDelete = async (id: number) => {
        const ok = await deleteMedia(id);
        if(!ok)
            message.error("Erro ao deletar")
        else 
            message.success("Mídia deletada");
    }

    if (loading) return <Spin />

    return(
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h2>Mídias</h2>
                <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>Nova midia</Button>
            </div>

            <MediaTable data={medias} onEdit={(m) => { setEditing(m); setOpen(true); }} onReload={() => fetchMedias()} onDelete={handleDelete} />

            <MediaForm open={open} editing={editing} onClose={() => setOpen(false)} onSubmit={handleCreateOrUpdate} />
        </div>
    )
}