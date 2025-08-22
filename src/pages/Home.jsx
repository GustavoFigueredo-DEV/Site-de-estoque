import Header from "../components/Header";
import Footer from "../components/Footer"
import style from '../styles/Home.module.css'
import { Package } from 'lucide-react';
import { FaPlus } from "react-icons/fa6";
import { DollarSign } from 'lucide-react';
import { TriangleAlert } from 'lucide-react';
import { ChevronsUp } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Eye } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <div className={style.topContainer}>
        <div className={style.title}>
          <h1 className={style.empresa}><Package className={style.pacoteIcon} size={30} /> SmartIQ</h1>
          <span>Sistema de Gestão de Estoque</span>
        </div>

        <div className={style.navegar}>
          <a className={style.addProdutoBtn} href="http://localhost:3000/produtos"><FaPlus /> Adicionar Produto</a>
        </div>
      </div>

      <hr />
      {/* card1 */}
      <div className={style.cardInfoContainer}>
        <div className={style.cardInfo}>
          <div className={style.type}>
            <p>Total de Produtos</p>
            <Package color="#26A8ED" />
          </div>
          <h1>1.234</h1>
          <h3>+12%<span> desde o mês passado</span></h3>
        </div>
        {/* card2 */}
        <div className={style.cardInfo}>
          <div className={style.type}>
            <p>Valor Total do Estoque</p>
            <DollarSign color="green" />
          </div>
          <h1>R$ 45.678</h1>
          <h3>+8%<span> desde o mês passado</span></h3>
        </div>
        {/* card3 */}
        <div className={style.cardInfo}>
          <div className={style.type}>
            <p>Produtos em Baixa</p>
            <TriangleAlert color="orange" />
          </div>
          <h1>1.234</h1>
          <h4>- 5%<span> desde o mês passado</span></h4>
        </div>
        {/* card4 */}
        <div className={style.cardInfo}>
          <div className={style.type}>
            <p>Movimentação Hoje</p>
            <ChevronsUp color="#26A8ED" />
          </div>
          <h1>156</h1>
          <h3>+23%<span> desde o mês passado</span></h3>
        </div>
      </div>

      {/* produtos recentes */}
      <div className={style.teste}>
        <div className={style.produtosRecentesContainer}>
          <div className={style.produtoInfo}>
            <p>Produtos recentes</p>
            <p>Categoria</p>
            <p>Estoque</p>
            <p>Preço</p>
            <p>Status</p>
            <p>Ações</p>
          </div>
        </div>
      </div>
      
      <div className={style.produtoContainer}>
        {/* produto1 */}
        <div className={style.produto}>
          <p>Echo Dot (5ª Geração)</p>
          <p>Assistentes</p>
          <p>10 unid.</p>
          <p>R$ 379,90</p>
          <span>Ativo</span>
          <p className={style.actions}><Ellipsis /> <SquarePen /> <Eye /> </p>
        </div>

        {/* produto2 */}
        <div className={style.produto}>
          <p>Fechadura Yale</p>
          <p>Segurança</p>
          <p>05 unid.</p>
          <p>R$ 1.599,00</p>
          <span>Ativo</span>
          <p className={style.actions}><Ellipsis /> <SquarePen /> <Eye /> </p>
        </div>

        {/* produto3 */}
        <div className={style.produto}>
          <p>Câmera Intelbras</p>
          <p>Segurança</p>
          <p>18 unid.</p>
          <p>R$ 229,00</p>
          <span>Ativo</span>
          <p className={style.actions}><Ellipsis /> <SquarePen /> <Eye /> </p>
        </div>
        
        {/* produto4 */}
        <div className={style.produto}>
          <p>Smartwatch Xiaomi Mi Band 8</p>
          <p>Saúde</p>
          <p>15 unid.</p>
          <p>R$ 279,00</p>
          <span>Ativo</span>
          <p className={style.actions}><Ellipsis /> <SquarePen /> <Eye /> </p>
        </div>

        {/* produto5 */}
        <div className={style.produto}>
          <p>Apple HomePod Mini</p>
          <p>Assistentes</p>
          <p>05 unid.</p>
          <p>R$ 1.099,00</p>
          <span>Ativo</span>
          <p className={style.actions}><Ellipsis /> <SquarePen /> <Eye /> </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
