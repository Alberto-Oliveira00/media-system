import { Button, Card, Form, Input, message } from "antd";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const ok = await login(values.userName, values.password);
    if (ok) {
      message.success("Login realizado!");
      navigate("/medias");
    } else {
      message.error("Usuário ou senha inválidos");
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "40px auto" }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="userName" label="Usuário" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={loading} block>
          Entrar
        </Button>
        <Button type="link" onClick={() => navigate("/register")} block>
          Criar conta
        </Button>
      </Form>
    </Card>
  );
}
