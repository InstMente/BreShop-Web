import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PaginaIncial from "./Pagina/PaginaInicial/PaginaIncial"


function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<PaginaIncial />}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
