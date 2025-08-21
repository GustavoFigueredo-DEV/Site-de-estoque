import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { SquarePen } from 'lucide-react';
import CadastroCategoria from '../components/CadastroCategoria';
import EditarCategoria from "../components/EditarCategoria";
import style from '../styles/Categorias.module.css';
import { Bot, Video, HeartPulse, Sprout, Building2, Factory, Zap, CirclePlus } from 'lucide-react';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

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

  //useState para não mostrar o modal
  const [mostrarCadastroCategoria, setMostrarCadastroCategoria] = useState(false)
  const [mostrarEditarCategoria, setMostrarEditarCategoria] = useState(false)

  // Função que vai receber a nova categoria do filho
  const handleNovaCategoria = (novaCategoria) => {
    setMostrarCadastroCategoria(false);
    setCategorias([...categorias, novaCategoria]);
  }

  // Atualiza uma categoria já existente
  const handleUpdateCategoria = (categoriaAtualizada) => {
    setCategorias((prev) =>
      prev.map((cat) =>
        cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat
      )
    );
  }

  // Remove uma categoria do estado
  const handleDeleteCategoria = (id) => {
    setCategorias((prev) => prev.filter((cat) => cat.id !== id));
  }

  return (
    <>
      <Header />
      <div className={style.categoriaContainerTop}>
        <h1 className={style.title}>Categorias de Estoque</h1>

        <div className={style.btnAddContainer}>
          <button onClick={() => setMostrarCadastroCategoria(true)} className={style.addCategoriaBtn}>
            <FaPlus size={20} /> Adicionar uma categoria
          </button>
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
                  <div className={style.editarBtnContainer}>
                    <button
                      className={style.editarBtn}
                      onClick={() => {
                        setCategoriaSelecionada(categoria.id);
                        setMostrarEditarCategoria(true);
                      }}
                    >
                      <SquarePen color="#26A8ED" />
                    </button>
                  </div>
                </div>

                <div className={style.textContainer}>
                  <p className={style.categoriaNome}>{categoria.name}</p>
                  <p className={style.categoriaDescricao}>{categoria.description}</p>
                </div>
              </div>
            );
          })
        )}

        <button onClick={() => setMostrarCadastroCategoria(true)} className={style.addCard}>
          <div className={style.addIcon}>
            <CirclePlus size={50} />
          </div>
          <p>Cadastrar mais categorias</p>
        </button>
      </div>

      {mostrarEditarCategoria && (
        <EditarCategoria
          id={categoriaSelecionada}
          onClose={() => setMostrarEditarCategoria(false)}
          onUpdate={handleUpdateCategoria}
          onDelete={handleDeleteCategoria}
        />
      )}

      {mostrarCadastroCategoria && (
        <CadastroCategoria
          onClose={() => setMostrarCadastroCategoria(false)}
          onCadastro={handleNovaCategoria}
        />
      )}
      <Footer/>
    </>
  );
}
