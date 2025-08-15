import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header'
import style from './CadastroCategoria.module.css'
import { ChartBarStacked } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function CadastroCategoria() {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("")

  const navigate = useNavigate()

  const isValid =
    nome.trim() !== "" && descricao.trim() !== "";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("categorias", {
        name: nome,
        description: descricao
      })
      navigate("/categorias")
    } catch (err) {
      setErro(err.message)
      console.log(erro);
    }
  }
  return (
    <>
      <div className={style.formContainer}>
        <form action="" onSubmit={handleSubmit}>



          <div className={style.form}>
            <button type="button"
              onClick={() => navigate(-1)}
              className={style.voltar}
            ><ChevronLeft size={25}/>
              Voltar
            </button>

            <h2 className={style.title}><ChartBarStacked size={30} /> Cadastro de categoria</h2>
            <span className={style.aviso}>*Preencha todos os campos.</span>
            <label htmlFor="nome">Nome:</label>
            <input type="text"
              id="nome"
              placeholder="Nome da categoria"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              name="descricao"
              id="descricao"
              value={descricao}
              placeholder="Descrição da categoria"
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            <div className={style.botoes}>

              <button type="submit" disabled={!isValid} className={style.cadastrar} >
                Cadastrar
              </button>


            </div>
          </div>
        </form>
      </div>
    </>
  );
}
