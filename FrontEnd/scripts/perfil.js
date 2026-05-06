const BACKEND = "http://localhost:3002";
const STORAGE_KEY = "flowlogin:user";

const getUsuarioSalvo = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

const setMensagem = (texto, tipo = "info") => {
  const msg = document.getElementById("mensagemPerfil");
  msg.innerText = texto;
  msg.dataset.tipo = tipo;
};

const preencherFormulario = (user) => {
  document.getElementById("usuarioPerfil").value = user.usuario || "";
  document.getElementById("emailPerfil").value = user.email || "";
  document.getElementById("idPerfil").innerText = user.id || "-";
  document.getElementById("nomeUsuario").innerText = user.usuario || "Usuário";
};

const carregarPerfil = async () => {
  const user = getUsuarioSalvo();

  if (!user?.id) {
    window.location.href = "./login.html";
    return;
  }

  preencherFormulario(user);

  try {
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

const atualizarPerfil = async (event) => {
  event.preventDefault();

  const user = getUsuarioSalvo();
  const usuario = document.getElementById("usuarioPerfil").value.trim();
  const email = document.getElementById("emailPerfil").value.trim();
  const senha = document.getElementById("senhaPerfil").value;

  if (!usuario || !email) {
    setMensagem("Nome e email são obrigatórios", "erro");
    return;
  }

  if (!email.includes("@")) {
    setMensagem("Preencha um email válido", "erro");
    return;
  }

  try {
    const res = await fetch(`${BACKEND}/usuarios/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, senha }),
    });

    const dados = await res.json();
    setMensagem(dados.message, dados.success ? "sucesso" : "erro");

    if (dados.success) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados.user));
      document.getElementById("senhaPerfil").value = "";
      preencherFormulario(dados.user);
    }
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    setMensagem("Erro ao conectar ao servidor", "erro");
  }
};

const excluirPerfil = async () => {
  const user = getUsuarioSalvo();
  const confirmou = confirm("Tem certeza que deseja excluir sua conta?");

  if (!confirmou) {
    return;
  }

  try {
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

const sair = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "./login.html";
};

document.addEventListener("DOMContentLoaded", () => {
  carregarPerfil();
  document.getElementById("perfilForm").addEventListener("submit", atualizarPerfil);
  document.getElementById("excluirConta").addEventListener("click", excluirPerfil);
  document.getElementById("sairConta").addEventListener("click", sair);
});
