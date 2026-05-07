const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

// Permite que o front-end chame a API mesmo se estiver em outra origem/porta.
app.use(cors());

// Faz o Express entender JSON enviado no corpo das requisicoes.
app.use(express.json());

// Disponibiliza os arquivos HTML, CSS e JS da pasta FrontEnd pelo proprio servidor.
app.use(express.static(path.join(__dirname, "../FrontEnd")));

// Conecta todas as rotas de autenticacao e perfil ao app Express.
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
