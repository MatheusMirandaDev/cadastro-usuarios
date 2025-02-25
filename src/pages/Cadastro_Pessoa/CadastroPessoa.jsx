// cadastroPessoa.jsx
import { useEffect, useState } from "react";
import "./CadastroPessoa.css";
import Lixo from "../../assets/lixo.svg";
import api from '../../services/api'

function Cadastro_Pessoa() {
  const [pessoa, setUsers] = useState([]);
  const [idade, setIdade] = useState("");
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState(false);
  const [erroIdade, setErroIdade] = useState(false);

  async function getPessoa() {
    const pessoaFromApi = await api.get("/Pessoa");
    setUsers(pessoaFromApi.data);
  }

  async function createPessoa() {
    const idadeNumero = Number(idade);
    const nomeValido = nome.trim() !== "";
    const idadeValida = /^\d+$/.test(idade) && idadeNumero >= 1 && idadeNumero <= 122;

    setErroNome(!nomeValido);
    setErroIdade(!idadeValida);

    if (!nomeValido || !idadeValida) {
      alert("Campo obrigatório para preenchimento!");
      return;
    }

    await api.post("/Pessoa", {
      nome: nome.trim(),
      idade: idadeNumero
    });
    getPessoa();
    setNome("");
    setIdade("");
  }

  async function deletePessoa(id) {
    console.log("Tentando deletar a pessoa com ID:", id);
    try {
      if (id) {
        const response = await api.delete(`/Pessoa/${id}`);
        console.log("Resposta do backend:", response);
        setUsers(pessoa.filter(pessoa => pessoa.id !== id)); // Atualiza a lista
      } else {
        console.log("ID inválido:", id);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error.response ? error.response.data : error.message);
    }
    getPessoa();  // Recarrega a lista de pessoas
  }
  

  useEffect(() => {
    getPessoa();
  }, []);

  function limiteIdade(event) {
    const valor = event.target.value;
    if (/^\d*$/.test(valor) && (valor === "" || (Number(valor) >= 1 && Number(valor) <= 122))) {
      setIdade(valor);
      setErroIdade(false);
    }
  }

  function caracteresPermitidos(event) {
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
          placeholder="Nome*"
          type="text"
          name="name"
          value={nome}
          onChange={caracteresPermitidos}
          required
        />
        <input
          className={erroIdade ? "erro" : ""}
          placeholder="Idade*"
          type="text"
          name="age"
          value={idade}
          onChange={limiteIdade}
          required
        />
        <button type="button" onClick={createPessoa}>Cadastrar</button>
      </form>

      {pessoa.map((pessoa, index) => (
  <div key={pessoa.id || index} className="card">
    <div>
      <p>Nome: <span>{pessoa.nome}</span></p>
      <p>Idade: <span>{pessoa.idade}</span></p>
    </div>
    <button onClick={() => {
  console.log("ID da pessoa para deletar:", pessoa.id);  // Adicionei o log para verificar o valor do ID
  deletePessoa(pessoa.id);
}}>
  <img src={Lixo} />
</button>
  </div>
))}
    </div>
  );
}

export default Cadastro_Pessoa;
