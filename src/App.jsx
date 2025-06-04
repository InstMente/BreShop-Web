import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PaginaIncial from "./Paginas/PaginaInicial/PaginaIncial"
import PaginaLogin from "./Paginas/PaginaLogin/PaginaLogin"
import PaginaCadastro from "./Paginas/PaginaCadastro/PaginaCadastro"
import PaginaMeusAnuncio from "./Paginas/PaginaMeusAnuncios/PaginaMeusAnuncios"
import PaginaRegistroVendas from "./Paginas/PaginaRegistroVendas/PaginaRegistroVendas"
import PaginaPerfil from "./Paginas/PaginaPerfil/PaginaPerfil"
import PaginaAnuncio from "./Paginas/PaginaAnuncio/PaginaAnuncio"
import PaginaRecuperarSenha from "./Paginas/PaginaRecuperarSenha/PaginaRecuperarSenha"



function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<PaginaLogin />}/>
        <Route path="/Home" element={<PaginaIncial />}/>
        <Route path="/cadastro" element={<PaginaCadastro />}/>
        <Route path="/meusAnuncio" element={<PaginaMeusAnuncio />}/>
        <Route path="/registroVendas" element={<PaginaRegistroVendas />}/>
        <Route path="/minhaConta" element={<PaginaPerfil />}/>
        <Route path="/anuncio" element={<PaginaAnuncio />}/>
        <Route path="/recuperacaoSenha" element={<PaginaRecuperarSenha />}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
