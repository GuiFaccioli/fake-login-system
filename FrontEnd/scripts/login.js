const BACKEND = "http://localhost:3002";

// Envia email e senha para a API validar o login.
const logar = async () => {
  const email = document.getElementById("usuarioDigitado").value.trim();
  const senha = document.getElementById("senhaDigitada").value;
  const msg = document.getElementById("mensagemLogin");

  // Evita requisicoes incompletas para o backend.
  if (!email || !senha) {
    msg.innerText = "Preencha todos os campos";
    return;
  }

  if (!email.includes("@")) {
    msg.innerText = "Preencha um email válido.";
    return;
  }

  try {
    // POST /login retorna success e os dados publicos do usuario quando a senha confere.
    const res = await fetch(`${BACKEND}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      const texto = await res.text().catch(() => null);
      msg.innerText = texto || `Erro ${res.status}`;
      return;
    }

    const dados = await res.json();
    msg.innerText = dados.message;

    if (dados.success) {
      // Guarda o usuario logado para a pagina de perfil saber quem buscar.
      localStorage.setItem("flowlogin:user", JSON.stringify(dados.user));

      setTimeout(() => {
        window.location.href = "home.html";
      }, 900);
    }
  } catch (erro) {
    console.error("Fetch error:", erro);
    msg.innerText = "Erro ao conectar ao servidor";
  }
};

// Evita depender de onclick inline no HTML.
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botaoLogin").addEventListener("click", logar);
});
