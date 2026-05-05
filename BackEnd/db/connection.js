const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "X1x2x3x4-",
  database: "loginflow",
});

connection.connect((err) => {
  if (err) {
    console.log("Erro na conexão:", err.message);
    return;
  }
  console.log("MySQL conectado");
});

module.exports = connection;
