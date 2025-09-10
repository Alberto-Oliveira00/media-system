import { Layout, Typography, Grid, Drawer, Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function PageHeader() {
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { key: "/medias", label: "Mídias" },
    { key: "/playlist", label: "Playlists" },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setDrawerOpen(false);
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: '#001529',
      }}
    >
      <Title level={3} style={{ color: "white", margin: 0 }}>
        Gerenciamento de Mídias
      </Title>

      {screens.md ? (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            flex: 1, 
            minWidth: 0, 
            justifyContent: 'flex-end',
            background: 'transparent',
            border: 'none',
          }}
        />
      ) : (
        <>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            style={{ fontSize: 20, color: "white" }}
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
          >
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
}