import { Button, Grid, Popconfirm, Space, Table } from "antd";
import type { Playlist } from "../types/playlist";
import { DeleteOutlined, EditOutlined, FileAddOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

type Props = {
    data: Playlist[];
    onEdit: (p:Playlist) => void;
    onDelete: (id: number) => Promise<void>;
    onOpenMedias: (p: Playlist) => void;
};

export default function PlaylistTable({ data, onEdit, onDelete, onOpenMedias }: Props) {
    const screens = useBreakpoint();

    const columns = [
        { title: "Nome", dataIndex: "nome", key: "nome" },
        { title: "Descrição", dataIndex: "descricao", key: "descricao" },
        { 
            title: "Mídias", 
            key: "medias",
            render: (_: any, r: Playlist) => (
                <Button onClick={() => onOpenMedias(r)} icon={<FileAddOutlined />}>
                    {r.medias?.length ?? 0}
                </Button>
            )
        },
        {
            title: "Ações",
            key: "acoes",
            render: (_: any, r: Playlist) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        shape={screens.md ? undefined : "circle"}
                        onClick={() => onEdit(r)}
                    >
                        {screens.md && "Editar"}
                    </Button>
                    <Popconfirm title="Remover?" onConfirm={() => onDelete(r.id)}>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            shape={screens.md ? undefined : "circle"}
                        >
                            {screens.md && "Excluir"}
                        </Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return (
        <Table rowKey="id" dataSource={data} columns={columns} pagination={{ pageSize: 8 }} />
    );
}
