import { Layout as AntLayout, Typography } from "antd";

const { Header, Content } = AntLayout;
const { Title } = Typography;

export default function HeaderPage({ children }: { children: React.ReactNode }) {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ background: '#001529', display: 'flex', alignItems: 'center' }}>
        <Title level={4} style={{ color: "white", margin: 0 }}>
          Player de Playlists
        </Title>
      </Header>
      <Content style={{ padding: 24}}>{children}</Content>
    </AntLayout>
  );
}
