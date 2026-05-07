const BACKEND = "http://localhost:3002";

// Envia os dados do formulario de cadastro para a API.
const cadastrar = async () => {
  const usuario = document.getElementById("usuarioCadastrado").value.trim();
  const email = document.getElementById("emailCadastrado").value.trim();
  const senha = document.getElementById("senhaCadastrada").value;
  const msg = document.getElementById("mensagemCadastro");

  // Validacao simples antes de chamar o backend.
  if (!usuario || !email || !senha) {
    msg.innerText = "Preencha todos os campos";
    return;
  }

  if (!email.includes("@")) {
    msg.innerText = "Preencha um email válido";
    return;
  }

  try {
    // POST /cadastro cria um novo usuario no banco.
    const res = await fetch(`${BACKEND}/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, senha }),
    });

    if (!res.ok) {
      const texto = await res.text().catch(() => null);
      msg.innerText = texto || `Erro ${res.status}`;
      return;
    }

    const dados = await res.json();
    msg.innerText = dados.message;

    if (dados.success) {
      // Depois do cadastro, leva o usuario para a tela de login.
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 900);
    }
  } catch (erro) {
    console.error("Erro no fetch:", erro);
    msg.innerText = "Erro ao conectar ao servidor";
  }
};

// Liga o clique do botao ao JavaScript quando o HTML terminar de carregar.
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botaoCadastro").addEventListener("click", cadastrar);
});
