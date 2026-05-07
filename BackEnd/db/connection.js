const mysql = require("mysql2");

// Configuracao da conexao com o banco local usado pelo projeto.
// Em um projeto publicado, estes valores devem vir de variaveis de ambiente.
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "X1x2x3x4-",
  database: "flowlogin",
});

// Testa a conexao assim que o backend inicia.
connection.connect((err) => {
  if (err) {
    console.log("Erro na conexão:", err.message);
    return;
  }
  console.log("MySQL conectado");
});

module.exports = connection;
