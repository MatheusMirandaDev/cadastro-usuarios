import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Cadastro_Pessoa/CadastroPessoa.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
