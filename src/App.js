import React, { useState, useEffect } from 'react'; // Importando React, useState e useEffect do pacote react
import './App.css'; // Importando o arquivo de estilo CSS
import axios from 'axios'; // Importando o pacote axios para fazer requisições HTTP

function App() { // Definindo o componente App
  const [amount, setAmount] = useState(1); // Definindo o estado para armazenar o valor a ser convertido
  const [fromCurrency, setFromCurrency] = useState('USD'); // Definindo o estado para armazenar a moeda de origem
  const [toCurrency, setToCurrency] = useState('BRL'); // Definindo o estado para armazenar a moeda de destino
  const [exchangeRate, setExchangeRate] = useState(); // Definindo o estado para armazenar a taxa de câmbio
  const [result, setResult] = useState(); // Definindo o estado para armazenar o resultado da conversão
  const [loading, setLoading] = useState(false); // Definindo o estado para controlar o estado de carregamento

  useEffect(() => { // Definindo um efeito colateral para buscar a taxa de câmbio ao carregar o componente ou quando fromCurrency ou toCurrency mudar
    const fetchExchangeRate = async () => { // Função assíncrona para buscar a taxa de câmbio
      try {
        setLoading(true); // Ativando o estado de carregamento
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`); // Fazendo uma requisição para a API de taxa de câmbio
        setExchangeRate(response.data.rates[toCurrency]); // Atualizando a taxa de câmbio com a resposta da API
      } catch (error) {
        console.error('Erro ao obter taxa de câmbio:', error); // Lidando com erros de requisição
      } finally {
        setLoading(false); // Desativando o estado de carregamento
      }
    };

    fetchExchangeRate(); // Chamando a função para buscar a taxa de câmbio
  }, [fromCurrency, toCurrency]); // Dependências do efeito: fromCurrency e toCurrency

  const handleAmountChange = (e) => { // Função para lidar com a mudança no valor a ser convertido
    setAmount(e.target.value); // Atualizando o estado do valor
  };

  const handleFromCurrencyChange = (e) => { // Função para lidar com a mudança na moeda de origem
    setFromCurrency(e.target.value); // Atualizando o estado da moeda de origem
  };

  const handleToCurrencyChange = (e) => { // Função para lidar com a mudança na moeda de destino
    setToCurrency(e.target.value); // Atualizando o estado da moeda de destino
  };

  const convertCurrency = () => { // Função para realizar a conversão de moeda
    setResult((amount * exchangeRate).toFixed(2)); // Calculando o resultado da conversão e arredondando para duas casas decimais
  };

  return (
    <div className="App"> {/* Elemento raiz do componente com a classe "App" */}
      <h1>Conversor de Moedas</h1> {/* Título do aplicativo */}
      <div className="converter"> {/* Seção do formulário de conversão */}
        <input type="number" value={amount} onChange={handleAmountChange} /> {/* Input para inserir o valor a ser convertido */}
        <select value={fromCurrency} onChange={handleFromCurrencyChange}> {/* Dropdown para selecionar a moeda de origem */}
          <option value="USD">USD ($)</option> {/* Opção para USD */}
          <option value="BRL">BRL (R$)</option> {/* Opção para BRL */}
        </select>
        para
        <select value={toCurrency} onChange={handleToCurrencyChange}> {/* Dropdown para selecionar a moeda de destino */}
          <option value="USD">USD ($)</option> {/* Opção para USD */}
          <option value="BRL">BRL (R$)</option> {/* Opção para BRL */}
        </select>
        <button onClick={convertCurrency} disabled={loading}> {/* Botão para realizar a conversão */}
          {loading ? 'Convertendo...' : 'Converter'} {/* Texto do botão dependendo do estado de carregamento */}
        </button>
      </div>
      <div className="result"> {/* Seção para exibir o resultado da conversão */}
        <h2>Resultado: {result ? `${result} ${toCurrency === 'USD' ? '($)' : '(R$)'}` : ''}</h2> {/* Exibição do resultado */}
      </div>
    </div>
  );
}

export default App; // Exportando o componente App

