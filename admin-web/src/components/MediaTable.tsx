import { Grid, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import type { Media } from "../types/media";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;


type Props = {
    data: Media[];
    onEdit: (m: Media) => void;
    onDelete: (id:number) => Promise<void>;
};

export default function MediaTable({ data, onEdit, onDelete }: Props) {

    const screens = useBreakpoint();
    
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
                )}
            />
        </Table>
    );
}