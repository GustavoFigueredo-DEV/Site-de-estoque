import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/Header';
import axios from 'axios';
import style from '../styles/Produtos.module.css';
import { FaPlus } from "react-icons/fa6";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

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
        <h1 className={style.title}>Categorias de Estoque</h1>
        <div className={style.btnAddProdutoContainer}>
          <Link to="/cadastrar-produto" className={style.addProdutoBtn}>
            <FaPlus size={20} /> Adicionar um produto
          </Link>
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
                <Link to={`/editar-produto/${produto.id}`} className={style.editarBtn}>
                  Editar
                </Link>
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
    </>
  );
}