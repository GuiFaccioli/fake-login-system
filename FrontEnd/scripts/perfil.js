const BACKEND = "http://localhost:3002";
const STORAGE_KEY = "flowlogin:user";

// Recupera do navegador o usuario salvo no momento do login.
const getUsuarioSalvo = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

// Centraliza como as mensagens aparecem no perfil.
const setMensagem = (texto, tipo = "info") => {
  const msg = document.getElementById("mensagemPerfil");
  msg.innerText = texto;
  msg.dataset.tipo = tipo;
};

// Coloca os dados do usuario nos campos visuais da tela.
const preencherFormulario = (user) => {
  document.getElementById("usuarioPerfil").value = user.usuario || "";
  document.getElementById("emailPerfil").value = user.email || "";
  document.getElementById("idPerfil").innerText = user.id || "-";
  document.getElementById("nomeUsuario").innerText = user.usuario || "Usuário";
};

// Busca no backend os dados atuais do usuario logado.
const carregarPerfil = async () => {
  const user = getUsuarioSalvo();

  if (!user?.id) {
    // Sem usuario salvo, nao existe perfil para carregar.
    window.location.href = "./login.html";
    return;
  }

  preencherFormulario(user);

  try {
    // GET /usuarios/:id retorna id, usuario e email.
    const res = await fetch(`${BACKEND}/usuarios/${user.id}`);
    const dados = await res.json();

    if (!dados.success) {
      setMensagem(dados.message || "Não foi possível carregar o perfil", "erro");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados.user));
    preencherFormulario(dados.user);
  } catch (erro) {
    console.error("Erro ao carregar perfil:", erro);
    setMensagem("Erro ao conectar ao servidor", "erro");
  }
};

// Envia alteracoes de nome, email e opcionalmente senha.
const atualizarPerfil = async (event) => {
  event.preventDefault();

  const user = getUsuarioSalvo();
  const usuario = document.getElementById("usuarioPerfil").value.trim();
  const email = document.getElementById("emailPerfil").value.trim();
  const senha = document.getElementById("senhaPerfil").value;

  // Nome e email sao obrigatorios; senha e opcional.
  if (!usuario || !email) {
    setMensagem("Nome e email são obrigatórios", "erro");
    return;
  }

  if (!email.includes("@")) {
    setMensagem("Preencha um email válido", "erro");
    return;
  }

  try {
    // PUT /usuarios/:id atualiza os dados no MySQL.
    const res = await fetch(`${BACKEND}/usuarios/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, senha }),
    });

    const dados = await res.json();
    setMensagem(dados.message, dados.success ? "sucesso" : "erro");

    if (dados.success) {
      // Atualiza o localStorage para refletir o perfil novo sem novo login.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados.user));
      document.getElementById("senhaPerfil").value = "";
      preencherFormulario(dados.user);
    }
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    setMensagem("Erro ao conectar ao servidor", "erro");
  }
};

// Exclui a conta do banco apos confirmacao do usuario.
const excluirPerfil = async () => {
  const user = getUsuarioSalvo();
  const confirmou = confirm("Tem certeza que deseja excluir sua conta?");

  if (!confirmou) {
    return;
  }

  try {
    // DELETE /usuarios/:id remove a conta atual.
    const res = await fetch(`${BACKEND}/usuarios/${user.id}`, {
      method: "DELETE",
    });

    const dados = await res.json();

    if (!dados.success) {
      setMensagem(dados.message, "erro");
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "./cadastro.html";
  } catch (erro) {
    console.error("Erro ao excluir perfil:", erro);
    setMensagem("Erro ao conectar ao servidor", "erro");
  }
};

// Logout simples: remove o usuario salvo no navegador.
const sair = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "./login.html";
};

// Registra todos os eventos da pagina de perfil.
document.addEventListener("DOMContentLoaded", () => {
  carregarPerfil();
  document.getElementById("perfilForm").addEventListener("submit", atualizarPerfil);
  document.getElementById("excluirConta").addEventListener("click", excluirPerfil);
  document.getElementById("sairConta").addEventListener("click", sair);
});
