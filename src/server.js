import express from "express";
import { config } from "dotenv";
import livroRoutes from "./routes/livro.routes.js";
import adaptacaoRoutes from "./routes/adaptacao.routes.js";
import prisma from "../prisma/prisma.js";

config(); // Carrega variáveis de ambiente do arquivo .env
const port = process.env.PORT || 3000;


const app = express();

app.use("/livros", livroRoutes);
app.use("/adaptacoes", adaptacaoRoutes);

const server = app.listen(port, () => {
  console.log(`📚 Servidor rodando na porta ${port}`);
});

// Tratamento de erros do servidor
server.on('error', (error) => {
  console.error('Erro no servidor:', error);
});

export default app;
