// 1. Validador de login simples
// Crie uma função chamada validarLogin que recebe email e senha.
// Se o email for "admin@email.com" e a senha for "123456",
// retorne "Login realizado com sucesso".
// Caso contrário, retorne "Email ou senha inválidos".


const validarLogin=()=> {

}



// 2. Verificador de idade para cadastro
// Crie uma função chamada verificarIdade que recebe uma idade.
// Se a idade for maior ou igual a 18, retorne "Cadastro permitido".
// Caso contrário, retorne "Cadastro negado".

const verificar = (valor) => {
 if (valor >= 18 ) {
    return "Cadastro permitido"
 } return "Cadastro Negado"
}

console.log(verificar(18))
console.log(verificar(17))




// 3. Calculadora de desconto
// Crie uma função chamada calcularDesconto que recebe o valor de um produto.
// Se o valor for maior ou igual a 100, aplique 10% de desconto.
// Caso contrário, mantenha o valor original.
// Retorne o valor final.






// 4. Status de pedido com switch
// Crie uma função chamada statusPedido que recebe um código.
// 1 = "Aguardando pagamento"
// 2 = "Pagamento confirmado"
// 3 = "Pedido enviado"
// 4 = "Entregue"
// Qualquer outro número = "Status inválido"

const statusPedido=(status)=>{
    if (status === 1) {
        return "Aguardando pagamento"
    }
    if (status === 2) {
        return "Pagamento confirmado"
    }
    if ( status === 3 ) {
        return "Pedido enviado"
    }
    if (status === 4) {
        return "Entregue"
    } return "Status Inválido"
}

console.log(statusPedido(1));
console.log(statusPedido(2));
console.log(statusPedido(3));
console.log(statusPedido(4));
console.log(statusPedido(5));




// 5. Verificador de cargo
// Crie uma função chamada verificarAcesso que recebe um cargo.
// Os cargos permitidos são: "admin" e "gerente".
// A função deve aceitar letras maiúsculas e minúsculas.
// Retorne "Acesso permitido" ou "Acesso negado".

const verificarCargo =(cargo)=> {
    const cargoFormatado = cargo.toLowerCase();
    if(cargoFormatado == "admin" || cargoFormatado == "gerente") {
            return "Acesso permitido"
        }
     return "Acesso negado"
}
console.log(verificarCargo("aDmin"))
console.log(verificarCargo("gErEnte"))
console.log(verificarCargo("consultor"))



// 6. Cadastro com campos obrigatórios
// Crie uma função chamada cadastrarUsuario que recebe nome, email e senha.
// Se algum campo estiver vazio, retorne "Preencha todos os campos".
// Se todos estiverem preenchidos, retorne "Usuário cadastrado com sucesso".

const cadastrarUsuario = (nome, email, senha) => {

    if (!nome || !email || !senha) {
        return "Preencha todos os campos"
    } return "Usuário cadastrado com sucesso"
}

console.log(cadastrarUsuario("Guilherme","gui@gui.com","1234"))
console.log(cadastrarUsuario("Guilherme","gui@gui.com",))


// 7. Estoque de produto
// Crie uma função chamada verificarEstoque que recebe nomeProduto e quantidade.
// Se a quantidade for maior que 0, retorne:
// "Produto disponível: NOME_DO_PRODUTO"
// Se a quantidade for 0, retorne:
// "Produto indisponível"






// 8. Carrinho de compras
// Crie uma função chamada calcularTotalCarrinho que recebe um array de preços.
// Some todos os preços e retorne o total.






// 9. Buscar usuário por email
// Crie uma função chamada buscarUsuario que recebe um array de usuários e um email.
// Cada usuário deve ser um objeto com nome e email.
// Se encontrar o email, retorne "Usuário encontrado: NOME".
// Se não encontrar, retorne "Usuário não encontrado".

const usuarios = [
  { nome: "Gui", email: "gui@email.com" },
  { nome: "Ana", email: "ana@email.com" },
  { nome: "Carlos", email: "carlos@email.com" }
];

console.log(buscarUsuario(usuarios, "ana@email.com"));
console.log(buscarUsuario(usuarios, "teste@email.com"));




// 10. Sistema de permissões
// Crie uma função chamada podeEditarPerfil que recebe um usuário.
// O usuário será um objeto com nome, cargo e logado.
// Só pode editar o perfil se:
// - estiver logado
// - e o cargo for "admin" ou "gerente"
// A função deve aceitar cargo em maiúsculo ou minúsculo.
// Retorne "Pode editar perfil" ou "Sem permissão".

const usuario1 = {
  nome: "Gui",
  cargo: "admin",
  logado: true
};

const usuario2 = {
  nome: "Ana",
  cargo: "vendedor",
  logado: true
};

const usuario3 = {
  nome: "Carlos",
  cargo: "gerente",
  logado: false
};

console.log(podeEditarPerfil(usuario1));
console.log(podeEditarPerfil(usuario2));
console.log(podeEditarPerfil(usuario3));



