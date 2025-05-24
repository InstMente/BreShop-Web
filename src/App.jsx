import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PaginaIncial from "./Paginas/PaginaInicial/PaginaIncial"
import PaginaLogin from "./Paginas/PaginaLogin/PaginaLogin"
import PaginaCadastro from "./Paginas/PaginaCadastro/PaginaCadastro"
import PaginaMeusAnuncio from "./Paginas/PaginaMeusAnuncio/PaginaMeusAnuncio"
import PaginaRegistroVendas from "./Paginas/PaginaRegistroVendas/PaginaRegistroVendas"


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
      </Routes>
      </Router>
    </>
  )
}

export default App
