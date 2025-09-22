import { Button, Card, Form, Input, message } from "antd";
import * as authService from "../api/authService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const ok = await register(values);
    if (ok) {
      message.success("Conta criada! Faça login");
      navigate("/login");
    } else {
      message.error("Erro ao criar usuário");
    }
  };

  return (
    <Card title="Cadastro" style={{ maxWidth: 400, margin: "40px auto" }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="userName" label="Usuário" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-mail" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit" type="primary" block>
          Cadastrar
        </Button>
      </Form>
    </Card>
  );
}
