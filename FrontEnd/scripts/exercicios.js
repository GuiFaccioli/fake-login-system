/*
1. Validação de login

Crie uma função que receba:
- email
- senha

Regras:
- se email ou senha estiverem vazios, retorne: "Preencha todos os campos"
- se a senha tiver menos de 6 caracteres, retorne: "Senha muito curta"
- senão, retorne: "Login válido"
*/

const logar = (email, senha) => {

    if (!email, !senha) {
        return `Preencha todos os campos`
    }
     return  `Login inválido`
}

console.log(logar('XPat,xxxx'))