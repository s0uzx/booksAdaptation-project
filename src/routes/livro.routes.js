import express from "express";
import LivroController from "../controllers/livroController.js";

const router = express.Router();

// GET /livros - Listar todos os livros
router.get("/", LivroController.getAllLivros);

//POST /livros - Criar novo livro
router.post("/", LivroController.createLivro);

export default router;

