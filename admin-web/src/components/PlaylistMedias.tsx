import { Button, Drawer, Grid, Modal, Popconfirm, Spin, Table } from "antd";
import type { Playlist } from "../types/playlist";
import { useMediaStore } from "../stores/useMediaStore";
import { usePlaylistStore } from "../stores/usePlaylistStore";
import { useEffect, useState } from "react";
import type { Media } from "../types/media";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

type Props = {
    open: boolean;
    playlist: Playlist | null;
    onClose: () => void;
};

export default function PlaylistMedias ({ open, playlist, onClose }: Props) {
    const screens = useBreakpoint();
    const { medias, loading, fetchMedias } = useMediaStore();
    const { addMediaToPlaylist, deleteMediaFromPlaylist } = usePlaylistStore();
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect (() => {
        if(open) {
            fetchMedias();
        }
    }, [open, fetchMedias]);

    const handleAdd = async (mediaId: number) => {
        if(!playlist) 
            return;
        setLoadingAction(true);
        const sucess = await addMediaToPlaylist(playlist.id, mediaId);
        setLoadingAction(false);
    };

    const handleRemove = async (mediaId: number) => {
        if(!playlist)
            return;
        setLoadingAction(true);
        const sucess = await deleteMediaFromPlaylist(playlist.id, mediaId);
        setLoadingAction(false);
    };

    const isMediaInPlaylist = (mediaId: number) => {
        return playlist?.medias?.some(m => m.id === mediaId) ?? false;
    }

    const columns = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { 
            title: "Ações", 
            key: "acoes",
            render: (_: any, r: Media) => (
                isMediaInPlaylist(r.id) ? (
                    <Popconfirm title="Remover?" onConfirm={() => handleRemove(r.id)}>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            loading={loadingAction}
                            shape={screens.md ? undefined : "circle"}
                        >
                            {screens.md && "Remover"}
                        </Button>
                    </Popconfirm>
                ) : (
                    <Button
                        icon={<FileAddOutlined />}
                        type="primary"
                        onClick={() => handleAdd(r.id)}
                        loading={loadingAction}
                        shape={screens.md ? undefined : "circle"}
                    >
                        {screens.md && "Adicionar"}
                    </Button>
                )
            )
        }
    ];

    const content = (
        <div style={{ padding: 16 }}>
            <h3>Mídias na Playlist</h3>
            <Table
                dataSource={playlist?.medias}
                columns={[{ title: "Nome", dataIndex: "nome", key: "nome" }]}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: 24 }}
            />
            
            <h3>Todas as Mídias</h3>
            {loading ? <Spin /> : (
                <Table
                    dataSource={medias}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 8 }}
                />
            )}
        </div>
    );

    if (!screens.md) {
        return (
            <Drawer
                title={`Gerenciar mídias de: ${playlist?.nome ?? ""}`}
                open={open}
                onClose={onClose}
                width="100%"
                footer={null}
            >
                {content}
            </Drawer>
        );
    }
    
    return (
        <Modal
            title={`Gerenciar mídias de: ${playlist?.nome ?? ""}`}
            open={open}
            onCancel={onClose}
            width={800}
            footer={null}
        >
            {content}
        </Modal>
    );
}