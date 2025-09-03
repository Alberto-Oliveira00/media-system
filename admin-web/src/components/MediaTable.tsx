import { Table, Space, Button, Popconfirm, message } from "antd";
import type { Media } from "../types/media";

type Props = {
    data: Media[];
    onEdit: (m: Media) => void;
    onReload: () => void;
    onDelete: (id:number) => Promise<void>;
};

export default function MediaTable({ data, onEdit, onReload, onDelete }: Props) {
    const handleDelete = async (id: number) => {
        const ok = await onDelete(id);
        if(ok == undefined)
            return
        message.success("Mídia removida");
        onReload();
    };
    
    return (
        <Table rowKey="id" dataSource={data} pagination={{ pageSize:8 }}>
            {/* <Table.Column<Media> title="ID" dataIndex="id" /> */}
            <Table.Column<Media> title="Nome" dataIndex="nome" />
            <Table.Column<Media> title="Descrição" dataIndex="descricao" />
            <Table.Column<Media> title="Arquivo"
            render={(_, r) => (
                <a href={`import.meta.env.VITE_API_BASE_URL?.replace("/api","") ?? ""}${r.filePath}`} target="_blank" rel="noreferrer">
                    abrir
                </a>
            )} 
            />
            <Table.Column<Media>
                title="Ações"
                render={(_, r) => (
                    <Space>
                        <Button onClick={() => onEdit(r)}>Editar</Button>
                        <Popconfirm title="Remover?" onConfirm={() => handleDelete(r.id)}>
                        <Button danger>Excluir</Button>
                        </Popconfirm>
                    </Space>
                )}
            />
        </Table>
    );
}