import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PaginaIncial from "./Paginas/PaginaInicial/PaginaIncial"
import PaginaLogin from "./Paginas/PaginaLogin/PaginaLogin"
import PaginaCadastro from "./Paginas/PaginaCadastro/PaginaCadastro"


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<PaginaLogin />}/>
        <Route path="/cadastro" element={<PaginaCadastro />}/>
        <Route path="/Home" element={<PaginaIncial />}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
