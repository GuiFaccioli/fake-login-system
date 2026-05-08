# Explicacao da Refatoracao

Esta refatoracao organizou melhor o backend sem mudar o comportamento atual da aplicacao.

A ideia foi separar duas responsabilidades:

- `routes`: define quais endpoints existem.
- `controllers`: executa a regra de negocio de cada endpoint.

Antes, o arquivo de rotas fazia quase tudo: recebia a rota, consultava o banco, usava bcrypt e montava a resposta.

Agora, a rota apenas recebe a requisicao e chama a funcao correta do controller.

## Arquivos alterados

### `BackEnd/routes/authRoutes.js`

Antes, este arquivo tinha toda a logica de cadastro, login, perfil, atualizacao e exclusao.

Agora, ele ficou mais simples. Ele apenas conecta cada rota a uma funcao do controller:

```js
router.post("/cadastro", authController.cadastrar);
router.post("/login", authController.logar);
router.get("/usuarios/:id", authController.buscarUsuario);
router.put("/usuarios/:id", authController.atualizarUsuario);
router.delete("/usuarios/:id", authController.excluirUsuario);
```

Ou seja:

- `POST /cadastro` chama `cadastrar`.
- `POST /login` chama `logar`.
- `GET /usuarios/:id` chama `buscarUsuario`.
- `PUT /usuarios/:id` chama `atualizarUsuario`.
- `DELETE /usuarios/:id` chama `excluirUsuario`.

A rota nao precisa saber como o banco funciona. Ela so aponta para quem resolve.

### `BackEnd/controllers/authController.js`

Este arquivo agora guarda a logica principal da autenticacao e do perfil.

O controller ficou responsavel por:

- ler dados vindos de `req.body`;
- ler parametros vindos de `req.params`;
- consultar o banco MySQL;
- verificar email duplicado;
- gerar hash de senha com bcrypt;
- comparar senha com bcrypt;
- devolver as mesmas respostas JSON que ja existiam.

No cadastro, o controller gera o hash com bcrypt antes de salvar:

```js
senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
```

No login, o controller usa `bcrypt.compare` para validar a senha digitada:

```js
senhaCorreta = await bcrypt.compare(senha, senhaSalva);
```

## Arquivo principal do servidor

### `BackEnd/server.js`

Este arquivo ja estava organizado e foi mantido como ponto principal do servidor.

Ele continua responsavel por:

- configurar o Express;
- configurar CORS;
- configurar `express.json()`;
- servir os arquivos estaticos da pasta `FrontEnd`;
- importar as rotas;
- usar `app.use(authRoutes)`;
- iniciar o servidor.

O arquivo principal nao deve carregar a regra de cadastro e login. Isso deixa o servidor mais limpo.

## O que saiu das routes

Saiu do arquivo `authRoutes.js`:

- consulta ao banco;
- validacao de campos obrigatorios;
- verificacao de email duplicado;
- `bcrypt.hash`;
- `bcrypt.compare`;
- montagem das respostas de cadastro, login e perfil.

Essas partes foram para o controller.

## O que ficou nas routes

Ficou nas routes apenas o mapeamento:

```js
metodo + endpoint -> funcao do controller
```

Exemplo:

```js
router.post("/login", authController.logar);
```

Isso significa: quando o frontend chamar `POST /login`, o Express deve executar a funcao `logar`.

## Onde o bcrypt ficou

O bcrypt ficou em `BackEnd/controllers/authController.js`.

Ele continua dentro do fluxo de cadastro e login, exatamente onde a regra acontece.

No cadastro:

- o usuario envia a senha;
- o controller recebe a senha;
- o controller gera o hash com `bcrypt.hash`;
- o banco salva a senha hasheada.

No login:

- o usuario envia email e senha;
- o controller busca o usuario no banco;
- o controller pega o hash salvo;
- o controller compara a senha digitada com o hash usando `bcrypt.compare`.

## Por que o bcrypt deve continuar nesse fluxo

O bcrypt protege a senha do usuario.

A senha pura nao deve ser salva no banco.

Por isso, no cadastro, a senha passa pelo `bcrypt.hash` antes do `INSERT`.

No login, nao tentamos descriptografar nada. O bcrypt nao funciona assim.

O correto e comparar:

- senha digitada;
- hash salvo no banco.

Essa comparacao e feita com `bcrypt.compare`.

## Por que essa separacao ajuda

Essa separacao deixa o backend mais facil de estudar.

Antes, o arquivo de rotas misturava tudo.

Agora:

- a rota mostra qual endpoint existe;
- o controller mostra o que acontece naquele endpoint;
- o servidor apenas configura a aplicacao.

Quando voce quiser entender o cadastro, pode abrir o controller e procurar a funcao `cadastrar`.

Quando quiser entender quais endpoints existem, pode abrir `authRoutes.js`.

## Fluxo do cadastro com bcrypt

Quando o frontend chama `POST /cadastro`, acontece este fluxo:

1. `authRoutes.js` recebe a rota `/cadastro`.
2. A rota chama `authController.cadastrar`.
3. O controller le `usuario`, `email` e `senha`.
4. O controller verifica se algum campo esta vazio.
5. O controller consulta o banco para saber se o email ja existe.
6. Se o email nao existir, o controller usa `bcrypt.hash`.
7. O controller salva `usuario`, `email` e `senhaHash` no MySQL.
8. O controller responde ao frontend com a mesma mensagem de sucesso ou erro.

## Fluxo do login com bcrypt

Quando o frontend chama `POST /login`, acontece este fluxo:

1. `authRoutes.js` recebe a rota `/login`.
2. A rota chama `authController.logar`.
3. O controller le `email` e `senha`.
4. O controller verifica se algum campo esta vazio.
5. O controller busca o usuario no banco pelo email.
6. Se o usuario existir, o controller pega o hash salvo em `user.senha`.
7. O controller usa `bcrypt.compare(senha, senhaSalva)`.
8. Se a senha estiver correta, o controller remove `user.senha` da resposta.
9. O controller responde ao frontend com sucesso e os dados publicos do usuario.

## Como testar se tudo continua funcionando

1. Inicie o servidor:

```bash
node BackEnd/server.js
```

2. Abra a tela de cadastro:

```text
http://localhost:3002/pages/cadastro.html
```

3. Cadastre um usuario novo.

4. Confira se a aplicacao redireciona para a tela de login.

5. Faca login com o email e senha cadastrados.

6. Confira se o login redireciona para `home.html`.

7. Abra o perfil e confira se os dados do usuario carregam.

8. Atualize o perfil para confirmar se `PUT /usuarios/:id` ainda funciona.

9. Se quiser testar a senha nova, altere a senha no perfil, saia da conta e faca login novamente.

10. Teste excluir a conta para confirmar se `DELETE /usuarios/:id` continua funcionando.

## Próximos exercícios

1. Criar validação simples no controller
2. Criar middleware para validar campos vazios
3. Separar a lógica em services
4. Melhorar tratamento de erros
5. Criar login com JWT
6. Criar uma rota GET /usuarios para treino
7. Criar testes simples para cadastro e login
