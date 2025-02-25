import { useEffect, useState } from "react";
import "./ConsultaTotais.css";
import api from "../../services/api";

function ConsultaTotais() {
  const [totaisGerais, setTotaisGerais] = useState({});
  const [totaisPorPessoa, setTotaisPorPessoa] = useState([]);

  // Função para buscar os totais de cada pessoa
  async function getTotais() {
    try {
      const response = await api.get("/ConsultaTotais");
      setTotaisPorPessoa(response.data);
    } catch (error) {
      console.error("Erro ao buscar os totais por pessoa:", error);
    }
  }

  // Função para buscar os totais gerais
  async function getTotaisGerais() {
    try {
      const response = await api.get("/ConsultaTotais/gerais");
      setTotaisGerais(response.data);
    } catch (error) {
      console.error("Erro ao buscar os totais gerais:", error);
    }
  }

  // Carrega os dados ao montar o componente
  useEffect(() => {
    getTotais();
    getTotaisGerais();
  }, []);

  return (
    <div className="container">
      <h1>Consulta de Totais</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Receitas (R$)</th>
            <th>Despesas (R$)</th>
            <th>Saldo (R$)</th>
          </tr>
        </thead>
        <tbody>
          {totaisPorPessoa.map((item) => (
            <tr key={item.nome}>
              <td>{item.nome}</td>
              <td>R$ {item.totalReceitas.toFixed(2)}</td>
              <td>R$ {item.totalDespesas.toFixed(2)}</td>
              <td>R$ {item.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totais-gerais">
        <h2>Totais Gerais</h2>
        <p>Total de Receitas: R$ {totaisGerais.totalReceitas?.toFixed(2) || "0.00"}</p>
        <p>Total de Despesas: R$ {totaisGerais.totalDespesas?.toFixed(2) || "0.00"}</p>
        <p>Saldo Líquido: R$ {totaisGerais.saldo?.toFixed(2) || "0.00"}</p>
      </div>
    </div>
  );
}

export default ConsultaTotais;
