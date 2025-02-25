import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/CadastrodePessoas">Cadastro de Pessoas</Link></li>
          <li><Link to="/CadastrodeTrasacao">Cadastro de Transações</Link></li>
          <li><Link to="/ConsultaDeTotais">Consulta de Totais</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
