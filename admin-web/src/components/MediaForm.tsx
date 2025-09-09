import { useEffect, useState } from "react";
import { Modal, Drawer, Form, Input, Upload, Button, Grid, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Media } from "../types/media";
import type { UploadFile } from "antd";
import type { RcFile } from "antd/es/upload";

const { useBreakpoint } = Grid;

type Props = {
  open: boolean;
  editing?: Media | null;
  onClose: () => void;
  onSubmit: (fd: FormData, editingId?: number) => Promise<void>;
};

export default function MediaForm({ open, editing, onClose, onSubmit }: Props) {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const [file, setFile] = useState<UploadFile | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    form.resetFields();
    setFile(null);
    if (editing) {
      form.setFieldsValue({
        Nome: editing.nome,
        Descricao: editing.descricao,
      });
    }
  }, [editing, form, open]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!editing && !file) {
        alert("Selecione um arquivo para cadastrar.");
        return;
      }

      const fd = new FormData();
      fd.append("Nome", values.Nome);

      if (values.Descricao) 
        fd.append("Descricao", values.Descricao);

      if (file?.originFileObj) 
        fd.append("File", file.originFileObj);

      setSubmitting(true);
      await onSubmit(fd, editing?.id);
      onClose();
    } catch (err: any) {
      console.error(err);
      message.error(`Erro ao salvar: ${err?.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const uploadProps = {
    beforeUpload: (f: File) => {
      const newFile: UploadFile = {
        uid: `${Date.now()}`,
        name: f.name,
        status: "done",
        originFileObj: f as RcFile,
      };
      setFile(newFile);
      return false;
    },
    fileList: file ? [file] : [],
    onRemove: () => {
      setFile(null);
    },
  };  
  

  const content = (
    <Form form={form} layout="vertical">
      <Form.Item 
        name="Nome" 
        label="Nome" 
        rules={[{ required: true, message: "Informe o nome" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="Descricao" 
        label="Descrição" 
        rules={[{ required: true, message: "Informe a descrição" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      
      <Form.Item label="Arquivo">
        <Upload {...uploadProps} maxCount={1}>
          <Button icon={<UploadOutlined />}>Selecionar arquivo</Button>
        </Upload>
        {editing && !file && (
          <div style={{ marginTop: 8 }}>    
            Arquivo atual: <a href={`${import.meta.env.VITE_API_BASE_URL?.replace("/api","") ?? ""}${editing.filePath}`} target="_blank" rel="noreferrer">abrir</a>
          </div>
        )}
      </Form.Item>
    </Form>
  );

  // Mobile
  if (!screens.md) {
    return (
      <Drawer
        title={editing ? "Editar mídia" : "Nova mídia"}
        open={open}
        onClose={onClose}
        width="100%"
        footer={[
          <Button key="cancel" onClick={onClose}>Cancelar</Button>,
          <Button key="save" type="primary" loading={submitting} onClick={handleOk}>{editing ? "Salvar" : "Criar"}</Button>
        ]}
      >
        {content}
      </Drawer>
    );
  }

  // Desktop
  return (
    <Modal
      title={editing ? "Editar mídia" : "Nova mídia"}
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
