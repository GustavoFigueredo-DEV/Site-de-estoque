import axios from "axios";
import { useState, useEffect } from "react";
import { Package, Image, Upload } from "lucide-react";
import style from "./EditarProduto.module.css";
import { useNavigate } from "react-router-dom";
import { Trash2 } from 'lucide-react';

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default function EditarProduto({ id, onClose, onUpdate }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemUrlAtual, setImagemUrlAtual] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const isValid =
    nome.trim() !== "" &&
    descricao.trim() !== "" &&
    preco !== "" &&
    (imagemFile !== null || imagemUrlAtual !== "") &&
    !isNaN(parseFloat(preco));

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await api.get(`/produtos/${id}`);
        const produto = res.data;
        setNome(produto.name);
        setDescricao(produto.description);
        setPreco(produto.price);
        setQuantidade(produto.quantity);
        setImagemUrlAtual(produto.imageUrl || "");
        setPreviewImage(produto.imageUrl ? `http://localhost:3333${produto.imageUrl}` : null);
        setCategoriaId(produto.categoryId || "");
      } catch (err) {
        setErro(err.response?.data?.message || err.message || "Erro ao carregar produto");
      }
    })();

    api
      .get("/categorias")
      .then(res => setCategorias(res.data))
      .catch(() => { });
  }, [id]);

  async function editarProduto(e) {
    e.preventDefault();

    let fileToSend = imagemFile;

    if (!imagemFile && imagemUrlAtual) {
      try {
        const response = await fetch(`http://localhost:3333${imagemUrlAtual}`);
        const blob = await response.blob();
        const fileName = imagemUrlAtual.split("/").pop();
        fileToSend = new File([blob], fileName, { type: blob.type });
      } catch {
        setErro("Erro ao preparar imagem atual para envio.");
        return;
      }
    }

    if (!fileToSend) return;

    const formData = new FormData();
    formData.append("image", fileToSend);
    formData.append("name", nome);
    formData.append("description", descricao);
    formData.append("price", preco);
    formData.append("quantity", quantidade);
    formData.append("categoryId", categoriaId || "");

    try {
      setUploading(true);
      await api.patch(`/produtos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (typeof onUpdate === "function") {
        onUpdate(); // atualiza a lista e fecha o modal
      }
    } catch (err) {
      setErro(err.response?.data?.message || err.message || "Erro ao editar produto.");
    } finally {
      setUploading(false);
    }
  }

  async function deletarProduto() {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/produtos/${id}`);

      if (typeof onUpdate === "function") {
        onUpdate(); // atualiza lista e fecha modal
      } else {
        navigate("/produtos");
      }
    } catch (err) {
      setErro(err.response?.data?.message || err.message || "Erro ao deletar produto.");
    }
  }

  if (erro === "Produto não encontrado") return <h1>Produto não encontrado</h1>;

  return (
    <div className={style.formContainer} onClick={onClose}>
      <div
        className={style.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <form id="editarProdutoForm" onSubmit={editarProduto} className={style.form}>
          <h1 className={style.title}>
            <Package size={30} color="#26A8ED" /> Editar Produto
          </h1>

          {erro && <p className={style.aviso}>{erro}</p>}

          <label htmlFor="nome">Nome do Produto</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <div className={style.precoQuantidadeContainer}>
            <div className={style.preco}>
              <label htmlFor="preco">Preço</label>
              <input
                type="number"
                step="0.01"
                id="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>
            <div className={style.quantidade}>
              <label htmlFor="quantidade">Quantidade</label>
              <input
                type="number"
                id="quantidade"
                min="0"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
          </div>

          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            className={style.selectCategoria}
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Sem categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </form>

        <div className={style.uploadContainer}>
          <div
            className={style.imageUpload}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                setImagemFile(file);
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          >
            {!previewImage ? (
              <>
                <div className={style.imageIconContainer}>
                  <Image size={40} color="#26A8ED" />
                </div>
                <h3>Atualizar Imagem</h3>
                <span className={style.instruction}>
                  Arraste e solte uma imagem aqui <br /> ou clique no botão abaixo
                </span>
                <label className={style.fileLabel} htmlFor="imagem">
                  <Upload size={20} style={{ marginRight: "5px" }} />
                  Selecionar Arquivo
                </label>
              </>
            ) : (
              <>
                <img
                  src={previewImage}
                  alt="Pré-visualização"
                  className={style.preview}
                />
                <label className={style.fileLabel} htmlFor="imagem">
                  <Upload size={20} style={{ marginRight: "5px" }} />
                  Trocar Imagem
                </label>
              </>
            )}

            <input
              type="file"
              id="imagem"
              accept="image/*"
              className={style.fileInput}
              onChange={(e) => {
                const file = e.target.files[0];
                setImagemFile(file);
                setPreviewImage(file ? URL.createObjectURL(file) : (imagemUrlAtual ? `http://localhost:3333${imagemUrlAtual}` : null));
              }}
            />
          </div>

          <div className={style.botoes}>
            <button
              className={style.cadastrar}
              type="submit"
              form="editarProdutoForm"
              disabled={!isValid || uploading}
            >
              {uploading ? "Salvando..." : "Salvar alterações"}
            </button>

            <button className={style.cancelar} type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className={style.deletar} type="button" onClick={deletarProduto}>
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
