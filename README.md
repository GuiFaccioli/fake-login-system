# LoginFlow

LoginFlow é um projeto prático de desenvolvimento web focado em cadastro e login de usuários. Ele integra front-end, back-end e banco de dados para simular um fluxo básico de autenticação usando uma API própria.

O projeto foi criado como estudo, mas com atenção à organização, persistência de dados, validações essenciais e proteção de senha com bcrypt.

## Objetivo do Projeto

O objetivo do LoginFlow é praticar conceitos fundamentais de uma aplicação web full-stack, incluindo:

- fluxo de cadastro e login;
- integração entre front-end, back-end e banco de dados;
- consumo de API própria com `fetch`;
- criação de rotas com Express;
- validação de dados no front-end e no back-end;
- persistência de usuários com MySQL;
- proteção de senha com hash usando bcrypt.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- MySQL
- bcrypt
- CORS
- Git e GitHub

## Funcionalidades

- Cadastro de usuário.
- Login de usuário.
- Validação de campos obrigatórios.
- Validação simples de formato de e-mail no front-end.
- Verificação de e-mail já cadastrado no back-end.
- Hash de senha com bcrypt antes de salvar no banco.
- Comparação de senha com bcrypt no login.
- Integração do front-end com o back-end via `fetch`.
- Respostas em JSON para cadastro e login.
- Armazenamento dos usuários no MySQL.
- Servimento dos arquivos estáticos do front-end pelo Express.

## Estrutura do Projeto

```text
LoginFlow/
+-- BackEnd/
|   +-- controllers/
|   |   +-- authController.js
|   +-- database/
|   |   +-- schema.sql
|   +-- db/
|   |   +-- connection.js
|   +-- routes/
|   |   +-- authRoutes.js
|   +-- server.js
+-- FrontEnd/
|   +-- pages/
|   |   +-- cadastro.html
|   |   +-- home.html
|   |   +-- index.html
|   |   +-- login.html
|   |   +-- perfil.html
|   +-- scripts/
|   |   +-- cadastro.js
|   |   +-- exercicios.js
|   |   +-- login.js
|   |   +-- perfil.js
|   +-- styles/
|       +-- styles.css
+-- package.json
+-- package-lock.json
```

### Principais Arquivos

- `BackEnd/server.js`: inicializa o servidor Express, configura CORS, JSON e arquivos estáticos.
- `BackEnd/routes/authRoutes.js`: contém as rotas de cadastro e login.
- `BackEnd/db/connection.js`: configura a conexão com o MySQL.
- `BackEnd/database/schema.sql`: script SQL para criar o banco e a tabela de usuários.
- `FrontEnd/pages`: páginas HTML da aplicação.
- `FrontEnd/scripts`: scripts responsáveis por capturar dados do formulário e consumir a API.
- `FrontEnd/styles/styles.css`: estilos da interface.

## Como Rodar o Projeto Localmente

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
```

### 2. Entrar na pasta do projeto

```bash
cd LoginFlow
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar o banco MySQL

Crie o banco e a tabela usando o arquivo:

```text
BackEnd/database/schema.sql
```

Você pode executar o script diretamente no MySQL Workbench, no terminal do MySQL ou em outra ferramenta de administração de banco.

### 5. Configurar a conexão com o banco

Edite o arquivo:

```text
BackEnd/db/connection.js
```

Configure os dados locais do seu MySQL, como `host`, `user`, `password` e `database`. Evite versionar senhas reais em projetos públicos; uma melhoria futura é mover esses dados para variáveis de ambiente.

### 6. Iniciar o servidor

O `package.json` atual não possui script `start`, então o servidor pode ser iniciado com:

```bash
node BackEnd/server.js
```

Por padrão, o servidor roda em:

```text
http://localhost:3002
```

### 7. Abrir o front-end no navegador

Com o servidor rodando, acesse uma das páginas do front-end:

```text
http://localhost:3002/pages/cadastro.html
```

ou

```text
http://localhost:3002/pages/login.html
```

## Banco de Dados

O projeto usa MySQL para armazenar os usuários cadastrados.

O script principal está em:

```text
BackEnd/database/schema.sql
```

### Tabela `usuarios`

Colunas identificadas no projeto:

- `id`: identificador único do usuário.
- `usuario`: nome de usuário informado no cadastro.
- `email`: e-mail do usuário, com restrição de valor único.
- `senha`: senha protegida com hash bcrypt.
- `created_at`: data e horário de criação do registro.

### Script SQL

```sql
CREATE DATABASE IF NOT EXISTS loginflow;
USE loginflow;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Fluxo da Aplicação

No cadastro, o usuário preenche os campos de nome, e-mail e senha. O front-end captura os dados do formulário e envia uma requisição `POST` para a rota `/cadastro` do back-end.

O back-end valida se os campos obrigatórios foram enviados, verifica se o e-mail já existe no banco, gera um hash da senha com bcrypt e salva o usuário na tabela `usuarios` do MySQL. Ao final, retorna uma resposta JSON para o front-end.

No login, o front-end envia e-mail e senha para a rota `/login`. O back-end busca o usuário pelo e-mail, compara a senha informada com o hash salvo usando `bcrypt.compare` e retorna uma resposta JSON indicando sucesso ou erro. O front-end exibe a mensagem recebida e, em caso de sucesso, redireciona o usuário para a página `home.html`.

## Aprendizados

- Criação de servidor com Express.
- Criação e organização de rotas.
- Integração com banco de dados MySQL.
- Manipulação do DOM com JavaScript.
- Consumo de API própria com `fetch`.
- Validação de dados no front-end e no back-end.
- Fluxo básico de autenticação.
- Segurança básica com hash de senha usando bcrypt.
- Organização inicial de um projeto full-stack.

## Melhorias Futuras

- Implementar JWT para autenticação.
- Usar variáveis de ambiente com `.env`.
- Criar uma arquitetura em camadas com controllers, services e repositories.
- Melhorar as validações de entrada.
- Retornar mensagens de erro com status HTTP apropriados.
- Criar scripts no `package.json`, como `start` e `dev`.
- Fazer deploy do front-end e do back-end.
- Adicionar testes automatizados.
- Melhorar a interface visual.
- Remover credenciais fixas do arquivo de conexão e usar configuração segura por ambiente.

## Autor

Desenvolvido por Guilherme Faccioli Crescencio

LinkedIn: [linkedin.com/in/guilherme-faccioli-b8a46611a](https://linkedin.com/in/guilherme-faccioli-b8a46611a)

GitHub: [github.com/GuiFaccioli](https://github.com/GuiFaccioli)
