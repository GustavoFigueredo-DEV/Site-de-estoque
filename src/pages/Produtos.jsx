import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'
import axios from 'axios';
import style from '../styles/Produtos.module.css';
import { FaPlus } from "react-icons/fa6";
import CadastroProduto from '../components/CadastroProduto';
import EditarProduto from '../components/EditarProduto';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [mostrarCadastrarProduto, setMostrarCadastrarProduto] = useState(false);
  const [editarProdutoId, setEditarProdutoId] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:3333"
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  }

  async function deletarProduto(id) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/produtos/${id}`);
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto.");
    }
  }

  return (
    <>
      <Header />
      <div className={style.produtoContainerTop}>
        <h1 className={style.title}>Produtos em Estoque</h1>
        <div className={style.btnAddProdutoContainer}>
          <button className={style.addProdutoBtn} onClick={() => setMostrarCadastrarProduto(true)}>
            <FaPlus size={20} /> Adicionar um produto
          </button>
        </div>
      </div>

      <div className={style.produtosContainer}>
        {produtos.length === 0 ? (
          <p>Nenhum produto foi cadastrado.</p>
        ) : (
          produtos.map(produto => (
            <div key={produto.id} className={style.produto}>
              <img
                src={`http://localhost:3333${produto.imageUrl}`}
                alt={produto.name}
                width={100}
              />
              <p className={style.produtoName}>{produto.name}</p>
              <p className={style.produtoDescription}>{produto.description}</p>
              <p className={style.produtoPrice}>R${produto.price.toFixed(2)}</p>
              <div className={style.produtoQuantidade}>
                <p>{produto.quantity} restantes</p>
              </div>

              <div className={style.btnContainer}>
                <button className={style.editarBtn} onClick={() => setEditarProdutoId(produto.id)}>
                  Editar
                </button>
                <button
                  type="button"
                  className={style.deleteButton}
                  onClick={() => deletarProduto(produto.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {mostrarCadastrarProduto && (
        <CadastroProduto 
          onClose={() => setMostrarCadastrarProduto(false)}
        />
      )}

      {editarProdutoId && (
        <EditarProduto 
          id={editarProdutoId} 
          onClose={() => setEditarProdutoId(null)}
        />
      )}
      <Footer/>
    </>
  );
}
