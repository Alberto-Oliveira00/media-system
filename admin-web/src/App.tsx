import { Layout } from 'antd'
import PageHeader from './components/PageHeader';
import { Navigate, Route, Routes } from 'react-router-dom';
import Medias from './pages/Medias';


function App() {
  
  const { Content } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageHeader />
      <Content style={{ padding: "24px"}}>
        <Routes>
          <Route path="/medias" element={<Medias />} />
          <Route path="/" element={<Navigate to="/medias" replace />} />
        </Routes>
      </Content>
    </Layout>
     
  )
}

export default App
