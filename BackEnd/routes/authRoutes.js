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

router.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT id, usuario, email FROM usuarios WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.json({ success: false, message: "Erro ao buscar usuário" });
      }

      if (results.length === 0) {
        return res.json({ success: false, message: "Usuário não encontrado" });
      }

      res.json({
        success: true,
        user: results[0],
      });
    },
  );
});

router.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { usuario, email, senha } = req.body;

  if (!usuario || !email) {
    return res.json({ success: false, message: "Nome e email são obrigatórios" });
  }

  connection.query(
    "SELECT id FROM usuarios WHERE email = ? AND id <> ?",
    [email, id],
    async (err, results) => {
      if (err) {
        return res.json({ success: false, message: "Erro ao verificar email" });
      }

      if (results.length > 0) {
        return res.json({ success: false, message: "Email ja cadastrado" });
      }

      if (senha) {
        let senhaHash;

        try {
          senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
        } catch (error) {
          return res.json({ success: false, message: "Erro ao atualizar usuário" });
        }

        connection.query(
          "UPDATE usuarios SET usuario = ?, email = ?, senha = ? WHERE id = ?",
          [usuario, email, senhaHash, id],
          (err, result) => {
            if (err) {
              return res.json({ success: false, message: "Erro ao atualizar usuário" });
            }

            if (result.affectedRows === 0) {
              return res.json({ success: false, message: "Usuário não encontrado" });
            }

            res.json({
              success: true,
              message: "Perfil atualizado com sucesso",
              user: { id: Number(id), usuario, email },
            });
          },
        );

        return;
      }

      connection.query(
        "UPDATE usuarios SET usuario = ?, email = ? WHERE id = ?",
        [usuario, email, id],
        (err, result) => {
          if (err) {
            return res.json({ success: false, message: "Erro ao atualizar usuário" });
          }

          if (result.affectedRows === 0) {
            return res.json({ success: false, message: "Usuário não encontrado" });
          }

          res.json({
            success: true,
            message: "Perfil atualizado com sucesso",
            user: { id: Number(id), usuario, email },
          });
        },
      );
    },
  );
});

router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.json({ success: false, message: "Erro ao excluir usuário" });
    }

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "Usuário não encontrado" });
    }

    res.json({
      success: true,
      message: "Usuário excluído com sucesso",
    });
  });
});

module.exports = router;
