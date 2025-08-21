import axios from "axios";
import { useState, useEffect } from "react";
import style from './EditarCategoria.module.css'
import { ChevronLeft } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { ArrowDownToLine } from 'lucide-react';
import { Trash2 } from 'lucide-react';


const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function EditarCategoria({ id, onClose, onUpdate, onDelete }) {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("")

  async function editarCategoria(e) {
    e.preventDefault();
    try {
      const res = await api.put(`/categorias/${id}`, {
        name: nome,
        description: descricao
      })
      onUpdate(res.data)   // avisa o pai que a categoria foi atualizada
      onClose()            // fecha modal
    } catch (err) {
      setErro(err.message)
    }
  }

  async function deletarCategoria() {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      await api.delete(`/categorias/${id}`)
      onDelete(id)         // avisa o pai que a categoria foi deletada
      onClose()            // fecha modal
    } catch (err) {
      setErro(err.message)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/categorias/${id}`);
        setNome(res.data.name);
        setDescricao(res.data.description);
      } catch (err) {
        setErro(err)
      }
    })()
  }, [id])

  const isValid = nome.trim() !== "" && descricao.trim() !== "";

  if (erro?.response?.status === 404) {
    return <h1>Categoria não encontrada</h1>
  }

  return (
    <div className={style.formContainer} onClick={onClose}>
      <form onSubmit={editarCategoria}>
        <div className={style.form} onClick={(e) => e.stopPropagation()}>

          <div className={style.titleContainer}>
            <h2 className={style.title}><Pencil /> Editar categoria</h2>

            <button type="button" onClick={deletarCategoria} className={style.deletar}>
              <Trash2 />
            </button>
          </div>

          <label htmlFor="nome">Alterar nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="descricao">Alterar descrição</label>
          <textarea
            id="descricao"
            placeholder="Descrição"
            required
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className={style.botoes}>
            <button type="submit" disabled={!isValid} className={style.salvarAlteracoes}>
              <ArrowDownToLine size={20} /> Salvar alterações
            </button>



            <button className={style.cancelar}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
