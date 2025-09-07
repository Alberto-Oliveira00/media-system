import { Layout, theme } from 'antd'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Medias from './pages/Medias';
import Playlists from './pages/Playlists';
import PageHeader from './components/PageHeader';
  
  const { Content } = Layout;

  function App() {
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    return (
      <BrowserRouter>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <PageHeader />

        <Content style={{ padding: "0 20px" }}>
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