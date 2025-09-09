import { Card, Typography, Space, Button, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Media } from "../types/media";

const { Title, Text } = Typography;

type Props = {
    media: Media;
    onEdit: (m: Media) => void;
    onDelete: (id: number) => Promise<void>;
};

const getMediaUrl = (filePath: string) =>
    `${import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ?? ""}${filePath}`;

const isImage = (filePath: string) =>
    filePath.match(/\.(jpg|jpeg|png|gif|webp)$/i);

export default function MediaCard({ media, onEdit, onDelete }: Props) {

    const renderMedia = () => {
        if (!media.filePath) return null;

        if (isImage(media.filePath)) {
            return (
                <img
                    alt={media.nome}
                    src={getMediaUrl(media.filePath)}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
            );
        } else {
            return (
                <video
                    src={getMediaUrl(media.filePath)}
                    controls={false}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
            );
        }
    };

    return (
        <Card
            cover={renderMedia()}
            actions={[
                <Tooltip key="edit" title="Editar">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(media)}
                        type="text"
                    />
                </Tooltip>,
                <Popconfirm
                    key="delete"
                    title="Remover mídia?"
                    onConfirm={() => onDelete(media.id)}
                    okText="Sim"
                    cancelText="Não"
                >
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        type="text"
                    />
                </Popconfirm>,
            ]}
        >
            <Card.Meta
                title={<Title level={5}>{media.nome}</Title>}
                description={
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            Criada em: {new Date(media.createdAt).toLocaleString()}
                        </Text>
                        <p style={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {media.descricao}
                        </p>
                    </Space>
                }
            />
        </Card>
    );
}