const bcrypt = require("bcrypt");
const connection = require("../db/connection");

// Quantidade de rodadas usadas pelo bcrypt para gerar o hash da senha.
const SALT_ROUNDS = 10;

// Cadastro: valida os dados, impede email duplicado e salva a senha como hash.
const cadastrar = (req, res) => {
  const { usuario, email, senha } = req.body;

  if (!usuario || !email || !senha) {
    return res.json({ success: false, message: "Preencha todos os campos" });
  }

  // O controller consulta o banco para verificar se o email ja existe.
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
        // bcrypt cria o hash antes de salvar a senha no banco.
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
};

// Login: busca o usuario pelo email e compara a senha digitada com o hash salvo.
const logar = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.json({ success: false, message: "Preencha todos os campos" });
  }

  // O controller consulta o banco para encontrar o usuario pelo email.
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
        // bcrypt.compare valida a senha digitada contra o hash salvo.
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
};

// Perfil: retorna dados publicos do usuario logado.
const buscarUsuario = (req, res) => {
  const { id } = req.params;

  // O controller consulta o banco usando o id recebido na rota.
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
};

// Atualizacao de perfil: altera nome/email e, se enviada, atualiza a senha.
const atualizarUsuario = (req, res) => {
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
          // bcrypt tambem protege a nova senha quando o perfil e atualizado.
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
};

// Exclusao de conta: remove o usuario pelo id recebido na URL.
const excluirUsuario = (req, res) => {
  const { id } = req.params;

  // O controller executa a operacao no banco e devolve a resposta ao front.
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
};

module.exports = {
  cadastrar,
  logar,
  buscarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
