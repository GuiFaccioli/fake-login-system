const BACKEND = "http://localhost:3001"; // ajuste para a porta do seu backend

const logar = async () => {
  const email = document.getElementById("usuarioDigitado").value;
  const senha = document.getElementById("senhaDigitada").value;
  const msg = document.getElementById("mensagemLogin");

  if (!email || !senha) {
    msg.innerText = "Preencha todos os campos";
    return;
  }

  try {
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

    if (dados.success) {
      if (dados.success) {
        msg.innerText = dados.message;
        setTimeout(() => (window.location.href = "home.html"), 1500); // relativo -> FrontEnd/pages/home.html
      } else {
        msg.innerText = dados.message;
      }
    }
  } catch (erro) {
    console.error("Fetch error:", erro);
    msg.innerText = "Erro ao conectar ao servidor";
  }
};
