import "./Home.css";

const Home = () => {


  return (
    <div>
  <h1>Sistema de Gestão de Gastos Residenciais</h1>
  <div>
    <p>
      O Sistema de Gestão de Gastos Residenciais foi desenvolvido para ajudar você a controlar suas finanças domésticas de maneira simples e eficiente. Com ele, você pode gerenciar as despesas e receitas de cada pessoa da casa e manter o controle do saldo geral.
    </p>
  </div>

  <div>
    <h2>Funcionalidades</h2>
    <ul>
      <li><strong>Cadastro de Pessoas:</strong> Crie, visualize e remova registros de pessoas no sistema.</li>
      <li><strong>Cadastro de Transações:</strong> Registre receitas e despesas, associando cada transação a uma pessoa da casa.</li>
      <li><strong>Consulta de Totais:</strong> Visualize o total de receitas, despesas e o saldo de cada pessoa, além do saldo geral da residência.</li>
      <li><strong>Restrição para Menores de 18 anos:</strong> Pessoas menores de 18 anos só podem registrar transações do tipo despesa.</li>
    </ul>
  </div>

  <div>
    <h2>Como Usar</h2>
    <p>
      Siga os passos abaixo para começar a usar o sistema:
    </p>
    <ol>
      <li>Adicione as pessoas responsáveis pelas finanças da casa.</li>
      <li>Cadastre as transações (despesas ou receitas) para cada pessoa, conforme o tipo de gasto.</li>
      <li>Consulte os totais de receitas, despesas e saldo de cada pessoa, além do total geral da residência.</li>
    </ol>
  </div>
</div>

  )


}

export default Home