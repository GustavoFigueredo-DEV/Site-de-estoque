import axios from "axios";
import { useState } from "react";
import style from './CadastroCategoria.module.css'
import { ChartBarStacked } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function CadastroCategoria({ onClose, onCadastro }) {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("")

  const isValid = nome.trim() !== "" && descricao.trim() !== "";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("categorias", {
        name: nome,
        description: descricao
      })

      // Chama a função do pai para atualizar a lista e fechar o modal
      if (onCadastro) onCadastro(res.data)

      // Limpa os campos
      setNome("")
      setDescricao("")

    } catch (err) {
      setErro(err.message)
      console.log(err);
    }
  }

  return (
    <>
      <div className={style.formContainer} onClick={onClose}>
        <form onSubmit={handleSubmit}>
          <div className={style.form} onClick={(e) => e.stopPropagation()}>

            <h2 className={style.title}><ChartBarStacked size={30} /> Cadastro de categoria</h2>

            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome da categoria"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="descricao">Descrição</label>
            <textarea
              name="descricao"
              id="descricao"
              value={descricao}
              placeholder="Descrição da categoria"
              onChange={(e) => setDescricao(e.target.value)}
              required
            />

            <div className={style.botoes}>
              <button
                type="submit"
                disabled={!isValid}
                className={style.cadastrar}
              >
                Cadastrar
              </button>

              <button
              className={style.cancelar}
              onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
