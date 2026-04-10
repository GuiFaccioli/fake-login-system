const express = require("express");
const router = express.Router();
const connection = require("../db/connection");

router.post("/cadastro", (req, res) => {
  const { usuario, email, senha } = req.body;

  if (!usuario || !email || !senha) {
    return res.json({ success: false, message: "Preencha todos os campos" });
  }

  connection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.json({ success: false, message: "Erro ao verificar email" });
      }

      if (results.length > 0) {
        return res.json({ success: false, message: "Email já cadastrado" });
      }

      connection.query(
        "INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)",
        [usuario, email, senha],
        (err, result) => {
          if (err) {
            return res.json({ success: false, message: "Erro ao cadastrar" });
          }
          res.json({
            success: true,
            message: "Cadastro realizado com sucesso",
            id: result.insertId,
            usuario: usuario,
          });
        },
      );
    },
  );
});

router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.json({ success: false, message: "Preencha todos os campos" });
  }

  connection.query(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, results) => {
      if (err) {
        return res.json({ success: false, message: "Erro ao fazer login" });
      }

      if (results.length === 0) {
        return res.json({
          success: false,
          message: "Email ou senha incorretos",
        });
      }

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        user: results[0],
      });
    },
  );
});

module.exports = router;
