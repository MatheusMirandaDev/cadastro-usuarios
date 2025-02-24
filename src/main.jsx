import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CadastroPessoa from './pages/Cadastro_Pessoa/CadastroPessoa.jsx'
import NavBar from './Components/NavBar.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <NavBar />
      <CadastroPessoa />
    </>
  </StrictMode>,
)
