import { useEffect, useState } from "react";
import "./CadastroPessoa.css";
import Lixo from "../../assets/lixo.svg";
import api from '../../services/api'

function Cadastro_Pessoa() {
  const [users, setUsers] = useState([]);
  const [idade, setIdade] = useState("");
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState(false);
  const [erroIdade, setErroIdade] = useState(false);

  async function getUsers() {
    const usersFromApi = await api.get("/Musicas");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    const idadeNumero = Number(idade);
    const nomeValido = nome.trim() !== "";
    const idadeValida = /^\d+$/.test(idade) && idadeNumero >= 1 && idadeNumero <= 122;

    setErroNome(!nomeValido);
    setErroIdade(!idadeValida);

    if (!nomeValido || !idadeValida) {
      alert("Campo obrigatório para preenchimento!");
      return;
    }

    await api.post("/Musicas", {
      nome: nome.trim(),
      anoLancamento: idadeNumero
    });
    getUsers();
    setNome("");
    setIdade("");
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/Musicas/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleIdadeChange(event) {
    const valor = event.target.value;
    if (/^\d*$/.test(valor) && (valor === "" || (Number(valor) >= 1 && Number(valor) <= 122))) {
      setIdade(valor);
      setErroIdade(false);
    }
  }

  function handleNomeChange(event) {
    const valor = event.target.value;
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(valor)) {
      setNome(valor);
      setErroNome(false);
    }
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Pessoa</h1>
        <input
          className={erroNome ? "erro" : ""}
          placeholder="Nome"
          type="text"
          name="name"
          value={nome}
          onChange={handleNomeChange}
          required
        />
        <input
          className={erroIdade ? "erro" : ""}
          placeholder="Idade"
          type="text"
          name="age"
          value={idade}
          onChange={handleIdadeChange}
          required
        />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>*Nome: <span> {user.nome} </span></p>
            <p>*Idade: <span>{user.anoLancamento} </span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Lixo} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cadastro_Pessoa;
