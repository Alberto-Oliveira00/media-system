import { Button, Drawer, Form, Grid, Input, message, Modal } from "antd";
import type { Playlist } from "../types/playlist";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

type Props = {
    open: boolean;
    editing?: Playlist | null;
    onClose: () => void;
    onSubmit: (data: any, editingId?: number) => Promise<void>;
};

export default function PlaylistForm({ open, editing, onClose, onSubmit}: Props) {
    const [form] = Form.useForm();
    const screens = useBreakpoint();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        form.resetFields();
        if (editing) {
            form.setFieldsValue({
                nome: editing.nome,
                descricao: editing.descricao,
                isActiveForPlayer: editing.isActiveForPlayer,
            });
        }
    }, [editing, form, open]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setSubmitting(true);
            await onSubmit(values, editing?.id);
            message.success(editing ? "Playlist atualizada com sucesso!" : "Playlist criada com sucesso!");
            onClose();
        } catch (err: any) {
            console.error(err);
            message.error(`Erro ao salvar: ${err?.message ?? "Erro desconhecido."}`);
        } finally {
            setSubmitting(false);
        }
    };

    const content = (
        <Form form={form} layout="vertical">
            <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Informe o nome" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="descricao" label="Descrição">
                <Input.TextArea rows={3} />
            </Form.Item>
        </Form>
    );

    if(!screens.md) {
        return(
            <Drawer
                title={editing ? "Editar playlist" : "Nova playlist"}
                open={open}
                onClose={onClose}
                width="100%"
                footer={[
                    <Button key="cancel" onClick={onClose}>Cancelar</Button>,
                    <Button key="save" type="primary" loading={submitting} onClick={handleOk}>
                        {editing ? "Salvar" : "Criar"}
                    </Button>
                ]}
            >
                {content}
            </Drawer>
        )
    }

    return (
        <Modal
        title={editing ? "Editar playlist" : "Nova playlist"}
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            confirmLoading={submitting}
            okText={editing ? "Salvar" : "Criar"}
        >
            {content}
        </Modal>
    );
}