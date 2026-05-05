const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const connection = require("../db/connection");

const SALT_ROUNDS = 10;

router.post("/cadastro", (req, res) => {
  const { usuario, email, senha } = req.body;

  if (!usuario || !email || !senha) {
    return res.json({ success: false, message: "Preencha todos os campos" });
  }

  connection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.json({ success: false, message: "Erro ao verificar email" });
      }

      if (results.length > 0) {
        return res.json({ success: false, message: "Email ja cadastrado" });
      }

      let senhaHash;

      try {
        senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
      } catch (error) {
        return res.json({ success: false, message: "Erro ao cadastrar" });
      }

      connection.query(
        "INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)",
        [usuario, email, senhaHash],
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
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.json({ success: false, message: "Erro ao fazer login" });
      }

      if (results.length === 0) {
        return res.json({
          success: false,
          message: "Email ou senha incorretos",
        });
      }

      const user = results[0];
      const senhaSalva = user.senha;
      let senhaCorreta;

      try {
        senhaCorreta = await bcrypt.compare(senha, senhaSalva);
      } catch (error) {
        return res.json({ success: false, message: "Erro ao fazer login" });
      }

      if (!senhaCorreta) {
        return res.json({
          success: false,
          message: "Email ou senha incorretos",
        });
      }

      delete user.senha;

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        user,
      });
    },
  );
});

module.exports = router;
