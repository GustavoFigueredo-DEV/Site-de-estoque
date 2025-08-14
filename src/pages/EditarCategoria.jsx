import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from '../styles/EditarCategoria.module.css'
import Header from '../components/Header'

const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function EditarCategoria() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("");

  const { id } = useParams();

  async function editarCategoria(e) {
    e.preventDefault();
    try {
      await api.put(`/categorias/${id}`, {
        name: nome,
        description: descricao
      })
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
      console.log(erro);
    }
  }

  async function deletarCategoria() {
    if (!window.confirm
      ("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categorias/${id}`)
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
    }
  }

  useEffect(() => {
    (
      async () => {
        try {
          const res = await api.get(`/categorias/${id}`);
          setNome(res.data.name);
          setDescricao(res.data.description);
        } catch (err) {
          setErro(err)
        }
      }
    )()
  }, [id])

  const navigate = useNavigate()

  const isValid =
    nome.trim() !== "" && descricao.trim() !== "";

  if (erro.response?.status === 404) {
    return (
      <h1>Categoria não encontrada</h1>
    )
  }

  return (
    <>
      <Header />
      <div className={style.formContainer}>
        <form action="" onSubmit={editarCategoria}>

          <div className={style.form}>
            <h2>Editar categoria</h2>
            <label htmlFor="nome">Alterar nome:</label>
            <input type="text"
              id="nome"
              placeholder="Nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="descricao">Alterar descrição:</label>
            <textarea
              name="descricao"
              id="descricao"
              value={descricao}
              placeholder="Descrição"
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <div className={style.botoes}>
              <button type="submit" disabled={!isValid} className={style.salvarAlteracoes} >
                Salvar alterações
              </button>

              <button type="button"
                onClick={() => navigate(-1)}
                className={style.cancelar}
              >
                Cancelar
              </button>
              <button onClick={() => deletarCategoria()} className={style.deletar}>Deletar Categoria</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
