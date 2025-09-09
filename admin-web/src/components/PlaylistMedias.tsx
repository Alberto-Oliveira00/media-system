import { Button, Popconfirm, Spin, Table, Typography } from "antd";
import type { Playlist } from "../types/playlist";
import { useMediaStore } from "../stores/useMediaStore";
import { usePlaylistStore } from "../stores/usePlaylistStore";
import { useEffect, useState } from "react";
import type { Media } from "../types/media";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

type Props = {
    playlist: Playlist;
};

export default function PlaylistMedias({ playlist }: Props) {
    const { medias, loading, fetchMedias } = useMediaStore();
    const { addMediaToPlaylist, deleteMediaFromPlaylist, fetchPlaylists } = usePlaylistStore();
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        fetchMedias();
    }, [fetchMedias]);

    const handleAdd = async (mediaId: number) => {
        setLoadingAction(true);
        const success = await addMediaToPlaylist(playlist.id, mediaId);
        setLoadingAction(false);
        if (success) {
            fetchPlaylists();
        }
    };

    const handleRemove = async (mediaId: number) => {
        setLoadingAction(true);
        const success = await deleteMediaFromPlaylist(playlist.id, mediaId);
        setLoadingAction(false);
        if (success) {
            fetchPlaylists();
        }
    };

    const isMediaInPlaylist = (mediaId: number) => {
        return playlist.medias?.some(m => m.id === mediaId) ?? false;
    };

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
                        >
                            Remover
                        </Button>
                    </Popconfirm>
                ) : (
                    <Button
                        icon={<FileAddOutlined />}
                        type="primary"
                        onClick={() => handleAdd(r.id)}
                        loading={loadingAction}
                    >
                        Adicionar
                    </Button>
                )
            )
        }
    ];

    return (
        <div>
            <Title level={3}>Mídias na Playlist</Title>
            <Table
                dataSource={playlist.medias}
                columns={[{ title: "Nome", dataIndex: "nome", key: "nome" }]}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: 24 }}
            />

            <Title level={3}>Todas as Mídias Disponíveis</Title>
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
}