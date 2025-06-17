import express from "express";
import AdaptacaoController from "../controllers/adaptacaoController.js";

const router = express.Router();

// GET /adaptacoes - Listar todas as adaptações
router.get("/", AdaptacaoController.getAllAdaptacoes);

// GET /adaptacoes/livro/:livroId - Obter adaptações de um livro específico
router.get("/livro/:livroId", AdaptacaoController.getAdaptacoesByLivro);

// POST /adaptacoes - Criar uma nova adaptação
router.post("/", AdaptacaoController.createAdaptacao);

export default router;