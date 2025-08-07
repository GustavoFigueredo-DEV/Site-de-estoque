import { Link } from "react-router-dom";
import style from './style.module.css'
import logo from '../../images/logoSmartIQ_transparente_crop.png'
import { Search } from 'lucide-react';
import { Moon } from 'lucide-react';


export default function Header() {
  return (
    <>
      <header>
        <div className={style.headerContainer}>

          <div className={style.logoContainer}>
            <img src={logo} alt="" />
          </div>

          <div className={style.searchbarContainer}>
          <Search className={style.icon} color="gray" size={20} />
          <input type="text" placeholder="Pesquisar" />
          </div>

          <div className={style.links}>
            <a href="/home">Home</a>
            <a href="/produtos">Produtos</a>
            <a href="/categorias">Categorias</a>

          </div>

        <div>
          <button className={style.colorMode}> <Moon color="black" size={25} /> </button>
        </div>

        </div>
      </header>
    </>
  )
}