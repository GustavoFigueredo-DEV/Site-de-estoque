import Header from "../components/Header";
import Footer from "../components/Footer"
import style from '../styles/Home.module.css'
import { Package } from 'lucide-react';
import { FaPlus } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <Header />
      <div className={style.topContainer}>
        <div className={style.title}>
          <h1 className={style.empresa}><Package className={style.pacoteIcon} size={30} /> SmartIQ</h1>
          <span>Sistema de Gestão de Estoque</span>
        </div>



        <div className={style.navegar}>
          <a className={style.addProdutoBtn} href="http://localhost:3000/produtos"><FaPlus/> Adicionar Produto</a>
        </div>
      </div>

      <hr />

      
      <Footer />
    </>

  );
}
