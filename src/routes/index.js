import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Categorias from "../pages/Categorias";
import Produtos from "../pages/Produtos";
export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  );
}
