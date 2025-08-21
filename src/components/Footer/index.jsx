import style from './style.module.css'
import onlyLogo from '../../images/ChatGPT_Image_16_de_mai._de_2025__11_59_41-removebg-preview 1.png'

export default function Footer() {
    return (
        <>
            <footer>
                <div className={style.empresaInfo}>
                    <div className={style.logoContainer}>
                        <img src={onlyLogo} alt="" />
                        <p>SmartIQ</p>
                    </div>
                    <div className={style.text}>
                        <span>A solução completa para gestão de estoque que sua empresa precisa. Controle inteligente, relatórios avançados e segurança total.</span>
                        <div className={style.owner}>
                            <p>GustavoFigueredo-DEV. Todos os direitos reservados.</p>
                        </div>
                    </div>

                </div>

                <div className={style.produto}>
                    <span>Produto</span>
                    <a href="#">Funcionalidades</a>
                    <a href="#">Preços</a>
                    <a href="#">Demonstração</a>
                    <a href="#">API</a>
                </div>
                <div className={style.suporte}>
                    <span>Suporte</span>
                    <a href="#">Central de Ajuda</a>
                    <a href="#">Contato</a>
                    <a href="#">Termos de Uso</a>
                    <a href="#">Privacidade</a>
                </div>
            </footer>
        </>
    )
}