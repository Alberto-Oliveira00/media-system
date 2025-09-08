// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./components/Layout";
import Home from "./pages/Home";
import PlayerPage from "./pages/PlayerPage";

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}
