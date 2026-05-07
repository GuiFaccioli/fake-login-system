const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const connection = require("../db/connection");

// Quantidade de rodadas usadas pelo bcrypt para gerar o hash da senha.
const SALT_ROUNDS = 10;

// Cadastro: valida os dados, impede email duplicado e salva a senha como hash.
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
        return res.json({ success: false, message: "Email já cadastrado" });
      }

      let senhaHash;

      try {
        // Nunca salvamos a senha pura no banco; salvamos apenas o hash.
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

// Login: busca o usuario pelo email e compara a senha digitada com o hash salvo.
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
        // bcrypt.compare retorna true quando a senha digitada corresponde ao hash.
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

      // Remove a senha da resposta para nao expor nem mesmo o hash ao front-end.
      delete user.senha;

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        user,
      });
    },
  );
});

// Perfil: retorna dados publicos do usuario logado.
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

// Atualizacao de perfil: altera nome/email e, se enviada, atualiza a senha.
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
        return res.json({ success: false, message: "Email já cadastrado" });
      }

      if (senha) {
        let senhaHash;

        try {
          // Ao trocar a senha, geramos um novo hash antes de atualizar no banco.
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

// Exclusao de conta: remove o usuario pelo id recebido na URL.
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
