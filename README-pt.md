# FakeLogin

Projeto de estudo full stack com foco em autenticação básica, integração entre frontend e backend, rotas HTTP, consumo de API e conexão com banco de dados.

## Objetivo

Este projeto foi criado para praticar conceitos fundamentais do desenvolvimento web, simulando um fluxo real de cadastro e login de usuários.

A proposta é treinar, na prática:

- HTML
- CSS
- JavaScript
- DOM
- Fetch API
- Node.js
- Express
- MySQL
- Git e GitHub

## Funcionalidades

- Cadastro de usuário
- Login de usuário
- Validação de campos no frontend
- Envio de dados para o backend
- Rotas `POST` para cadastro e login
- Integração com banco de dados
- Exibição de mensagens de sucesso e erro
- Redirecionamento após login

## Tecnologias utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express

### Banco de dados
- MySQL

## Estrutura do projeto

```bash
FakeLogin/
├── FrontEnd/
│   ├── pages/
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   └── home.html
│   ├── scripts/
│   │   ├── login.js
│   │   └── cadastro.js
│   └── styles/
│       └── style.css
├── BackEnd/
│   ├── server.js
│   ├── routers/
│   └── ...
├── package.json
└── README.md

Como funciona

O projeto simula um fluxo simples de autenticação:

O usuário preenche os campos de cadastro ou login no frontend
O JavaScript captura os dados digitados
Os dados são enviados para o backend com fetch
O backend recebe a requisição
O backend valida os dados
O backend consulta ou grava informações no banco de dados
O sistema retorna uma resposta para o frontend
O frontend exibe a mensagem correspondente para o usuário
Conceitos praticados

Este projeto foi desenvolvido para reforçar conceitos importantes como:

manipulação de DOM
eventos
funções assíncronas com async/await
requisições HTTP
rotas com Express
uso de req.body
validações no frontend e no backend
organização de arquivos
integração com banco de dados relacional
Melhorias que podem ser adicionadas no futuro
Criptografia de senha com bcrypt
Autenticação com JWT
Logout
Proteção de rotas
Validação mais completa de email
Tratamento de erros mais detalhado
Melhorias visuais na interface
Responsividade
Refatoração do código
Como rodar o projeto
1. Clone o repositório
git clone https://github.com/SEU-USUARIO/FakeLogin.git
2. Acesse a pasta do projeto
cd FakeLogin
3. Instale as dependências do backend
npm install
4. Configure o banco de dados MySQL

Crie o banco e a tabela de usuários de acordo com a estrutura usada no projeto.

Exemplo básico:

CREATE DATABASE estudo;

USE estudo;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);
5. Configure os dados da conexão com o banco no backend

No arquivo do servidor, ajuste:

host
user
password
database
6. Inicie o servidor
node server.js

ou, se estiver usando nodemon:

npx nodemon server.js
7. Abra o frontend no navegador

Abra o arquivo HTML do projeto ou rode a aplicação com um servidor local.  (Eu estou acostumado a usar o LiveServer)

Aprendizados com este projeto

Durante o desenvolvimento deste projeto, foram praticados pontos importantes para a base de um desenvolvedor júnior, como:

comunicação entre frontend e backend
estruturação de rotas
envio e recebimento de dados em JSON
validação de formulário
integração com banco de dados
organização de projeto em pastas
fluxo básico de autenticação
Status do projeto

Projeto em desenvolvimento para fins de estudo.

Autor

Desenvolvido por Guilherme Faccioli como projeto de aprendizado em desenvolvimento web.
