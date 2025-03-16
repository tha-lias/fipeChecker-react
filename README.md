# Consultar tabela FIPE / FIPE Checker
<br>

<div align="center">
  <a href="https://tha-lias.github.io/fipeChecker-react/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Ver%20esse%20projeto-blue?style=for-the-badge&logo=github&logoColor=white" alt="Ver esse projeto">
  </a>
</div>

<br>

O **Fipe Checker** é uma aplicação web que permite consultar valores de veículos diretamente da Tabela FIPE. Desenvolvido com **React** e **Material-UI**, o projeto oferece uma interface intuitiva e responsiva, além da funcionalidade de histórico de consultas, que te permite comparar valores de veiculos.

<p align="center">
  <img src="https://github.com/user-attachments/assets/37cf6747-06c1-46a1-87aa-1be68a303b6e" alt="Imagem da tela do projeto"/>
</p>

## Tecnologias Utilizadas

[![My Skills](https://skillicons.dev/icons?i=react,js,materialui)](https://skillicons.dev)

| Tecnologia | Versão |
|------------|--------|
| React      | 18.2.0 |
| Material-UI| 6.4.7  |
| Axios      | 1.8.3  |

## Funcionalidades Principais

- 🚗 **Consulta de Valores**: Busque o valor de veículos por marca, modelo e ano.
- 📜 **Histórico de Consultas**: Visualize todas as consultas realizadas, com detalhes como data e valor.
- 🌙 **Dark Mode**: Interface com tema escuro para maior conforto visual.
- 📱 **Responsivo**: Funciona perfeitamente em dispositivos móveis e desktops.

## 🎯 Objetivos Pessoais Alcançados

Este projeto foi desenvolvido como parte do meu **aprendizado contínuo em React** e **integração com APIs**. Durante o desenvolvimento, foquei em:

- **Componentização**: Estruturei o projeto em componentes reutilizáveis, como o formulário de consulta e o histórico de consultas.
- **Gerenciamento de Estado**: Utilizei o `useState` e `useEffect` do React para gerenciar o estado da aplicação de forma eficiente.
- **Integração com APIs**: Conectei a aplicação à API da Tabela FIPE para obter as informações basedas no fabricante, modelo e ano selecionado.
- **Responsividade**: Garanti que a aplicação funcione bem em diferentes tamanhos de tela.

Esses objetivos me ajudaram a consolidar meus conhecimentos em React e a desenvolver aplicações mais robustas e escaláveis.

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/tha-lias/fipeChecker-react.git
2. **Instale as dependências**:
   ```bash
   npm install
3. **Configure a chave da API da Tabela FIPE**:
   - Acesse o site FIPE Online e gere um token gratuito. (https://fipe.online/)
   - Crie um arquivo .env na raiz do projeto e adicione a seguinte linha:
     ```bash
     REACT_APP_FIPE_API_TOKEN=seu_token_aqui
4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start

<div align="center">
  <a href="https://tha-lias.github.io/fipeChecker-react/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Ver%20esse%20projeto-blue?style=for-the-badge&logo=github&logoColor=white" alt="Ver esse projeto">
  </a>
</div>
