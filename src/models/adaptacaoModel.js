import prisma from "../../prisma/prisma.js";


class AdaptacaoModel {

  async findAll() {
    try {
      const adaptacoes = await prisma.adaptacao.findMany({
        include: {
          livro: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return adaptacoes;
    } catch (error) {
      console.error("Erro ao encontrar adaptações:", error);
      throw error;
    }
  }



  async findByLivroId(livroId) {
    try {
      const adaptacoes = await prisma.adaptacao.findMany({
        where: {
          livroId: Number(livroId),
        },
        include: {
          livro: true,
        },
        orderBy: {
          anoLancamento: "asc",
        },
      });
      return adaptacoes;
    } catch (error) {
      console.error("Erro ao encontrar adaptações por livro:", error);
      throw error;
    }
  }



  async create(titulo, diretor, anoLancamento, duracao, genero, livroId) {
    try {
      const novaAdaptacao = await prisma.adaptacao.create({
        data: {
          titulo,
          diretor,
          anoLancamento,
          duracao,
          genero,
          livroId,
        },
        include: {
          livro: true,
        },
      });
      return novaAdaptacao;
    } catch (error) {
      console.error("Erro ao tentar criar nova adaptação:", error);
      throw error;
    }
  }
}

export default new AdaptacaoModel();
