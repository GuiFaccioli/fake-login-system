const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Cada rota recebe o endpoint e chama a funcao correta do controller.
router.post("/cadastro", authController.cadastrar);
router.post("/login", authController.logar);
router.get("/usuarios/:id", authController.buscarUsuario);
router.put("/usuarios/:id", authController.atualizarUsuario);
router.delete("/usuarios/:id", authController.excluirUsuario);

module.exports = router;
