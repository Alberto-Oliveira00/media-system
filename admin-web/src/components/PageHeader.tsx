import { Layout, Typography, Menu, Grid, Drawer, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function PageHeader() {
  const screens = useBreakpoint();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { path: "/medias", label: "Mídias" },
    { path: "/playlist", label: "Playlists" },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Title level={3} style={{ color: "white", margin: 0 }}>
        Gerenciamento de Mídias
      </Title>

      {/* Menu Desktop */}
      {screens.md ? (
        <nav style={{ display: "flex", gap: "24px" }}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: location.pathname.startsWith(link.path)
                  ? "bold"
                  : "normal",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : (
        <>
          {/* Menu Mobile */}
          <MenuOutlined
            onClick={() => setDrawerOpen(true)}
            style={{ fontSize: 20, color: "white" }}
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    color: location.pathname.startsWith(link.path)
                      ? "#1677ff"
                      : "inherit",
                    fontWeight: location.pathname.startsWith(link.path)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Drawer>
        </>
      )}
    </Header>
  );
}