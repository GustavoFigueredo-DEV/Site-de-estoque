import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import style from '../styles/Categorias.module.css';
import { FaPlus } from "react-icons/fa6";
import { SquarePen } from 'lucide-react';
import CadastroCategoria from '../components/CadastroCategoria';
import EditarCategoria from '../components/EditarCategoria';
import { Bot, Video, HeartPulse, Sprout, Building2, Factory, Zap, CirclePlus } from 'lucide-react';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:3333",
  });

  useEffect(() => {
    api
      .get("/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.log("Erro ao buscar as categorias.", err));
  }, []);

  // Mapeamento dos nomes das categorias para os ícones
  const categoriaIcones = {
    Assistentes: Bot,
    Segurança: Video,
    Saúde: HeartPulse,
    Agricultura: Sprout,
    Cidade: Building2,
    Indústria: Factory,
    Energia: Zap,
  };

  return (
    <>
      <Header />
      <div className={style.categoriaContainerTop}>
        <h1 className={style.title}>Categorias de Estoque</h1>

        <div className={style.btnAddContainer}>
          <Link to="/cadastrar-categoria" className={style.addCategoriaBtn}>
            <FaPlus size={20} /> Adicionar uma categoria
          </Link>
        </div>
      </div>

      <div className={style.categoriasContainer}>
        {categorias.length === 0 ? (
          <p>Nenhuma categoria foi cadastrada.</p>
        ) : (
          categorias.map((categoria) => {
            const Icon = categoriaIcones[categoria.name] || Bot; // Ícone padrão

            return (

              <div key={categoria.id} className={style.categoria}>
                <div className={style.iconContainer}>
                  <Icon color="#26A8ED" size={50} />

                  <Link to={`/editar-categoria/${categoria.id}`} className={style.editarLink}>
                    <SquarePen color="#26A8ED" />
                  </Link>
                </div>

                <div className={style.textContainer}>
                  <p className={style.categoriaNome}>{categoria.name}</p>
                  <p className={style.categoriaDescricao}>{categoria.description}</p>

                </div>

              </div>

            );
          })

        )}
        <Link to="/cadastrar-categoria" className={style.addCard}>
          <div className={style.addIcon}>
            <CirclePlus size={50} />
          </div>
          <p>Cadastrar mais categorias</p>
        </Link>
      </div>

      <CadastroCategoria />
      <EditarCategoria />
    </>
  );
}


