// src/components/Layout.tsx
import { Layout as AntLayout, Menu, Typography } from "antd";
import { Link } from 'react-router-dom';

const { Header, Content } = AntLayout;
const { Title } = Typography;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Title level={4} style={{ color: "white", margin: 0 }}>
          <a style={{ textDecoration: 'none', color: 'white' }} href="/">Player de Playlists</a>
        </Title>

      </Header>

      <Content style={{ padding: 24 }}>{children}</Content>
    </AntLayout>
  );
}
