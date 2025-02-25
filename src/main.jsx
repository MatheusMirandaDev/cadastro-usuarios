import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'; 
import CadastroPessoa from './pages/Cadastro_Pessoa/CadastroPessoa';
import CadastroTransacao from './pages/Cadastro_Transacao/CadastroTransacao';
import ConsultaTotais from './pages/Consulta_Totais/ConsultaTotais';
import Home from './pages/Home/Home';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> }, 
      { path: "CadastroDePessoas", element: <CadastroPessoa /> },
      { path: "CadastroDeTrasacoes", element: <CadastroTransacao /> },
      { path: "ConsultaDeTotais", element: <ConsultaTotais /> }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
