import { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Medias from './pages/Medias';
import Playlists from './pages/Playlists';
  
  const { Header, Content } = Layout;
  const { Title } = Typography;

  function App() {
    const [selectedKey, setSelectedKey] = useState('1');
    const {
      token: { colorBgContainer },
    } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout className='layout' style={{minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Gerenciamento de Mídias
          </Title>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => setSelectedKey(key)}
            items={[
              { key: '1', label: <Link to="/medias">Mídias</Link> },
              { key: '2', label: <Link to="/playlist">Playlists</Link> },
            ]}
            style={{ flex: 1, minWidth: 0, marginLeft: 20 }}
          />
        </Header>
        <Content style={{ padding: '0 50px'}}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: 8,
                marginTop: 20,
              }}  
            >
              <Routes>
                <Route path="/medias" element={<Medias />} />
                <Route path="/playlist" element={<Playlists />} />
                <Route path="/" element={<Navigate to="/medias" replace />} />
              </Routes>
            </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

