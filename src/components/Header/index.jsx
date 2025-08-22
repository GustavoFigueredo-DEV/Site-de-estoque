import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from './style.module.css'
import logo from '../../images/logoSmartIQ_transparente_crop.png'
import { Search } from 'lucide-react';

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleKeyDown(e) {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/produtos?search=${encodeURIComponent(search)}`);
    }
  }

  return (
    <header>
      <div className={style.headerContainer}>
        <div className={style.logoContainer}>
          <a href="/"><img src={logo} alt="logo" /></a>
        </div>

        <div className={style.searchbarContainer}>
          <Search className={style.icon} color="gray" size={20} />
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={style.links}>
          <a href="/">Home</a>
          <a href="/produtos">Produtos</a>
          <a href="/categorias">Categorias</a>
        </div>
      </div>
    </header>
  )
}
