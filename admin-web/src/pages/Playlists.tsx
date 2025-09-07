import { Button, Grid, Spin } from "antd";
import { useEffect, useState } from "react";
import type { Playlist } from "../types/playlist";
import { updatePlaylist } from "../api/playlistService";
import { usePlaylistStore } from "../stores/usePlaylistStore";
import PlaylistTable from "../components/PlaylistTable";
import PlaylistForm from "../components/PlaylistForm";
import PlaylistMedias from "../components/PlaylistMedias";

const { useBreakpoint } = Grid;

export default function Playlists() {
    const { playlists, loading, fetchPlaylists, addPlaylist, updatePlaylist, deletePlaylist } = usePlaylistStore();
    const [ open, setOpen] = useState(false);
    const [openMedias, setOpenMedias] = useState(false);
    const [editing, setEditing] = useState<Playlist | null>(null);

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const handleCreateOrUpdate = async (fd: FormData, editingId?: number) => {
        let sucess = false;
        if (editingId){
            sucess = await updatePlaylist(editingId, fd);
        } else {
            sucess = await addPlaylist(fd);
        }

        if(sucess) {
            fetchPlaylists();
            setOpen(false);
            setEditing(null)
        }
    };

    const handleDelete = async (id: number) => {
        const ok = await deletePlaylist(id);
        if(ok) {
            fetchPlaylists();
        }
    };

    if(loading) return <Spin />;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16}}>
                <h2>Playlists</h2>
                <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>
                    Adicionar playlist
                </Button>
            </div>

            <PlaylistTable 
                data={playlists} 
                onEdit={(p) => { setEditing(p); setOpen(true); }}
                onDelete={handleDelete}
                onOpenMedias={(p) => { setEditing(p); setOpenMedias(true); }}
            />
            
            <PlaylistForm
                open={open}
                editing={editing}
                onClose={() => { setOpen(false); setEditing(null); }}
                onSubmit={handleCreateOrUpdate}
            />

            <PlaylistMedias
                open={openMedias}
                playlist={editing}
                onClose={() => {
                    setOpenMedias(false);
                    setEditing(null);
                }}
            />
        </div>
    );
}