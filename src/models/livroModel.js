import prisma from "../../prisma/prisma.js";
 
class LivroModel {
    async findAll() {
        try {
            const livros = await prisma.livro.findMany({
                include: {
                    adaptacoes: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return livros;
        } catch (error) {
            console.error("Erro ao encontrar livros:", error);
            throw error;
        }
    }

    async create(titulo, autor, anoPublicacao, genero, sinopse, paginas) {
        try {
            const novoLivro = await prisma.livro.create({
                data: {
                    titulo,
                    autor,
                    anoPublicacao,
                    genero,
                    sinopse,
                    paginas,
                },
                include: {
                    adaptacoes: true,
                },
            });

            return novoLivro;
        } catch (error) {
            console.error("Erro ao criar livro:", error);
            throw error;
        }
    }
}

export default new LivroModel();