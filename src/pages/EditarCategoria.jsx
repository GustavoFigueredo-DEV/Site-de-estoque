import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default function EditarCategoria() {
  const [icone, setIcone] = useState("")
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  async function editarCategoria(e) {
    e.preventDefault();
    try {
      await api.put(`/categorias/${id}`, {
        name: nome,
        description: descricao
      });
      navigate("/categorias");
    } catch (err) {
      setErro(err);
    }
  }

  async function deletarCategoria(e) {
    e.preventDefault();
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categorias/${id}`);
      navigate("/categorias");
    } catch (err) {
      setErro(err);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/categorias/${id}`);
        setNome(res.data.name);
        setDescricao(res.data.description);
      } catch (err) {
        setErro(err);
      }
    })();
  }, [id]);

  const isValid = nome.trim() !== "" && descricao.trim() !== "";

  if (erro?.response?.status === 404) {
    return (
      <h1>Categoria não encontrada</h1>
    );
  }

  return (
    <>
      <form onSubmit={editarCategoria}>
        <h2>Editar categoria</h2>

        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" placeholder="Nome da categoria" required value={nome} onChange={(e) => setNome(e.target.value)} />

        <label htmlFor="descricao">Descrição:</label>
        <textarea name="descricao" id="descricao" value={descricao} placeholder="Descrição da categoria" onChange={(e) => setDescricao(e.target.value)} required />

        <div className="botoes">
          <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" disabled={!isValid}>Salvar Alterações</button>
          <button type="button" onClick={deletarCategoria}>Deletar Categoria</button>
        </div>
      </form>
    </>
  );
}
