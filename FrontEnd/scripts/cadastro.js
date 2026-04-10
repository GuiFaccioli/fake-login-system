const cadastrar = async () => {
  const usuario = document.getElementById("usuarioCadastrado").value;
  const email = document.getElementById("emailCadastrado").value;
  const senha = document.getElementById("senhaCadastrada").value;
  const msg = document.getElementById("mensagemCadastro");

  try {
    const res = await fetch("http://localhost:8000/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, senha }),
    });
    const dados = await res.json();
    msg.innerText = dados.message;
  } catch (erro) {
    msg.innerText = "Erro ao conectar";
  }
};
