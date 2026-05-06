const BACKEND = "http://localhost:3002";

const cadastrar = async () => {
  const usuario = document.getElementById("usuarioCadastrado").value.trim();
  const email = document.getElementById("emailCadastrado").value.trim();
  const senha = document.getElementById("senhaCadastrada").value;
  const msg = document.getElementById("mensagemCadastro");

  if (!usuario || !email || !senha) {
    msg.innerText = "Preencha todos os campos";
    return;
  }

  if (!email.includes("@")) {
    msg.innerText = "Preencha um email válido";
    return;
  }

  try {
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
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 900);
    }
  } catch (erro) {
    console.error("Erro no fetch:", erro);
    msg.innerText = "Erro ao conectar ao servidor";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botaoCadastro").addEventListener("click", cadastrar);
});
