import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import { Bot } from 'lucide-react';
import { Video } from 'lucide-react';
import { HeartPulse } from 'lucide-react';
import { Sprout } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { Factory } from 'lucide-react';
import { Zap } from 'lucide-react';

const api = axios.create({
  baseURL: "http://localhost:3333"
})

export default function CadastroCategoria() {
  //Cadastro de categoria
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("")

  const navigate = useNavigate()

  const isValid = nome.trim() !== "" && descricao.trim() !== "";
  async function handleSubmit(e){
    e.preventDefault();
    try{
      await api.post("categorias", {
        name: nome,
        description: descricao
      })
      navigate("/categorias")
    }catch(err){
      setErro(err.message)
      console.log(erro);
    }
  }

  return (
    <>
    <Header />
    <form action="" onSubmit={handleSubmit}>
      <h2>Cadastro de categoria</h2>
      <label htmlFor="nome">Nome:</label>

      <label htmlFor="descricao">Descrição:</label>
      <textarea name="descricao" id="descricao" value={descricao} placeholder="Descrição da categoria" onChange={(e)=> setDescricao(e.target.value)} required />

      <div className="botoes">
        <button type="button" onClick={()=> navigate(-1)}>Cancelar</button>
        <button type="submit" disabled={!isValid}>Salvar</button>
      </div>
    </form>
    </>
  );
}
