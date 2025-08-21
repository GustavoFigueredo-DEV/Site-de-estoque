import axios from "axios";
import { useState, useEffect } from "react";
import { Package, Image, Upload } from "lucide-react";
import style from "./CadastroProduto.module.css";

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default function CadastroProduto({ onClose }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [imagemFile, setImagemFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [erro, setErro] = useState("");

  const isValid = nome && descricao && preco && categoriaId;

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    }
    fetchCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setUploading(true);

    try {
      let imagemUrl = null;
      if (imagemFile) {
        const formData = new FormData();
        formData.append("file", imagemFile);
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        imagemUrl = uploadRes.data.url;
      }

      await api.post("/produtos", {
        nome,
        descricao,
        preco,
        quantidade,
        categoriaId,
        imagem: imagemUrl
      });

      onClose();
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar produto");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.formContainer} onClick={onClose}>
        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>

          <div className={style.form}>
            <h1 className={style.title}>
              <Package size={30} color="#26A8ED" /> Cadastrar Novo Produto
            </h1>

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
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>

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
                  <h3>Adicionar Imagem</h3>
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
                  if (file) {
                    setPreviewImage(URL.createObjectURL(file));
                  } else {
                    setPreviewImage(null);
                  }
                }}
              />
            </div>

            <div className={style.botoes}>
              <button className={style.cancelar} type="button" onClick={onClose}>
                Cancelar
              </button>
              <button className={style.cadastrar} type="submit" disabled={!isValid || uploading}>
                {uploading ? "Salvando..." : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {erro && <p className={style.aviso}>{erro}</p>}
    </form>
  );
}
