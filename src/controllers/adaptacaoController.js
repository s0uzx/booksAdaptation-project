import AdaptacaoModel from "../models/adaptacaoModel.js";
import LivroModel from "../models/livroModel.js";

class AdaptacaoController {
  async getAllAdaptacoes(req, res) {
    try {
      const adaptacoes = await AdaptacaoModel.findAll();
      res.json({
        success: true,
        data: adaptacoes,
        total: adaptacoes.length,
      });
    } catch (error) {
      console.error("Erro ao encontrar adaptações:", error);
      res.status(500).json({
        success: false,
        error: "Erro do servidor ao tentar encontrar adaptações",
      });
    }
  }


  async getAdaptacoesByLivro(req, res) {
    try {
      const { livroId } = req.params;
      
      
      const livro = await LivroModel.findById(livroId);
      if (!livro) {
        return res.status(404).json({
          success: false,
          error: "Livro não encontrado",
        });
      }

      const adaptacoes = await AdaptacaoModel.findByLivroId(livroId);
      res.json({
        success: true,
        data: adaptacoes,
        total: adaptacoes.length,
        livro: {
          id: livro.id,
          titulo: livro.titulo,
          autor: livro.autor,
        },
      });
    } catch (error) {
      console.error("Erro ao tentar encontrar adaptações por livro:", error);
      res.status(500).json({
        success: false,
        error: "Erro do servidor ao tentar encontrar adaptações por livro",
      });
    }
  }


  async createAdaptacao(req, res) {
    try {
      const { titulo, diretor, anoLancamento, duracao, genero, livroId } = req.body;

     
      if (!titulo || !diretor || !anoLancamento || !duracao || !genero || !livroId) {
        return res.status(400).json({
          success: false,
          error: "O campos: titulo, diretor, anoLancamento, duracao, genero, livroId, são obrigatórios!",
        });
      }

     
      if (typeof anoLancamento !== 'number' || anoLancamento < 1800) {
        return res.status(400).json({
          success: false,
          error: "O ano de lançamento deve ser um número válido (após 1800)",
        });
      }

      if (typeof duracao !== 'number' || duracao <= 0) {
        return res.status(400).json({
          success: false,
          error: "A duração deve ser um número positivo (em minutos)",
        });
      }

      if (typeof livroId !== 'number') {
        return res.status(400).json({
          success: false,
          error: "O ID do livro deve ser um número válido",
        });
      }

   
      const livro = await LivroModel.findById(livroId);
      if (!livro) {
        return res.status(400).json({
          success: false,
          error: "Livro não encontrado com o ID fornecido",
        });
      }

      const novaAdaptacao = await AdaptacaoModel.create(
        titulo,
        diretor,
        anoLancamento,
        duracao,
        genero,
        livroId
      );

      res.status(201).json({
        success: true,
        data: novaAdaptacao,
        message: "Adaptação criada com sucesso",
      });
    } catch (error) {
      console.error("Erro ao criar adaptação:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor ao criar adaptação",
      });
    }
  }
}

export default new AdaptacaoController();
