import { useEffect, useState } from "react";
import "./CadastroTransacao.css";
import api from "../../services/api";

function CadastroTransacao() {
  const [transacoes, setTransacao] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Despesa");
  const [pessoaId, setPessoaId] = useState("");
  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);

  // Estados para controle de erro
  const [erroDescricao, setErroDescricao] = useState(false);
  const [erroValor, setErroValor] = useState(false);
  const [erroPessoaId, setErroPessoaId] = useState(false);

  async function getTransacao() {
    const transacaoFromApi = await api.get("/Transacao");
    setTransacao(transacaoFromApi.data);
  }

  async function getPessoas() {
    const pessoasFromApi = await api.get("/Pessoa");
    setPessoas(pessoasFromApi.data);
  }

  async function createTransacao() {
    let erro = false;

    // Valida os campos obrigatórios
    if (!descricao) {
      setErroDescricao(true);
      erro = true;
    } else {
      setErroDescricao(false);
    }

    if (!valor) {
      setErroValor(true);
      erro = true;
    } else {
      setErroValor(false);
    }

    if (!pessoaId) {
      setErroPessoaId(true);
      erro = true;
    } else {
      setErroPessoaId(false);
    }

    if (erro) {
      alert("O(s) campo(s) em vermelho é(sao) obrigatorio(s)!");
      return;
    }

    try {
      // Se a pessoa for menor de 18, só poderá ter "Despesa"
      const tipoConvertido = pessoaSelecionada && pessoaSelecionada.idade < 18
        ? 1  // Menores de idade só podem ter despesa (1)
        : tipo === "Despesa"
        ? 1  // Tipo Despesa é 1
        : 0; // Caso contrário, será receita (0)

      const newTransacao = {
        descricao,
        valor: parseFloat(valor).toFixed(2),
        tipo: tipoConvertido, 
        pessoaId: parseInt(pessoaId),
      };

      await api.post("/Transacao", newTransacao);

      setDescricao("");
      setValor("");
      setTipo("Despesa");
      setPessoaId("");
      getTransacao();
    } catch (error) {
      console.error("Erro ao criar transação:", error.response?.data || error);
      alert("Erro ao criar transação!");
    }
  }

  function handlePessoaSelect(event) {
    const selectedPessoaId = event.target.value;
    setPessoaId(selectedPessoaId);

    const pessoa = pessoas.find((p) => p.id === parseInt(selectedPessoaId));
    setPessoaSelecionada(pessoa);
  }

  useEffect(() => {
    getTransacao();
    getPessoas();
  }, []);

  return (
    <div className="container">
      <h1>Cadastro de Transação</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTransacao();
        }}
      >
        <div>
          <label>Pessoa referente à transferência</label>
          <select
            value={pessoaId}
            onChange={handlePessoaSelect}
            className={erroPessoaId ? "input-erro" : ""}
          >
            <option value="">Selecione uma pessoa*</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome} ({pessoa.idade} anos)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Valor*</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className={erroValor ? "input-erro" : ""}
          />
        </div>
        <div>
          <label>Descrição*</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={erroDescricao ? "input-erro" : ""}
          />
        </div>
        <div>
          <label>Tipo*</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={pessoaSelecionada && pessoaSelecionada.idade < 18}
          >
            <option value="Despesa">Despesa</option>
            {!(pessoaSelecionada && pessoaSelecionada.idade < 18) && (
              <option value="Receita">Receita</option>
            )}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Transações Cadastradas</h2>
      <div className="tabela-container">
        <table className="tabela-planilha">
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao, index) => (
              <tr key={transacao.id || `transacao-${index}`}>
                <td>{transacao.pessoa?.nome}</td>
                <td>R$ {transacao.valor}</td>
                <td className="descricao">{transacao.descricao}</td>
                <td className={transacao.tipo === 1 ? "despesa" : "receita"}>
                  <strong>{transacao.tipo === 1 ? "Despesa" : "Receita"}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroTransacao;
