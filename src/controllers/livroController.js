import LivroModel from "../models/livroModel";

class LivroController {
    async getAllLivros(req, res) {
    try {
      const livros = await LivroModel.findAll();
      res.json({
        success: true,
        data: livros,
        total: livros.length,
      });
    } catch (error) {
      console.error("Erro ao encontrar livros:", error);
      res.status(500).json({
        success: false,
        error: "Erro do servidor ao tentar buscar livros",
      });
    }
  }

    async createLivro(req, res) {
    try {
      const { titulo, autor, anoPublicacao, genero, sinopse, paginas } = req.body;


    
      if (!titulo || !autor || !anoPublicacao || !genero || !paginas) {
        return res.status(400).json({
          success: false,
          error: "Os campos: titulo, autor, anoPublicacao, genero, paginas, são obrigatórios",
        });
      }



      if (typeof anoPublicacao !== 'number' || anoPublicacao < 0) {
        return res.status(400).json({
          success: false,
          error: "O ano de publicação deve ser um número positivo",
        });
      }


      if (typeof paginas !== 'number' || paginas <= 0) {
        return res.status(400).json({
          success: false,
          error: "O número de páginas deve ser um número positivo",
        });
      }


      const novoLivro = await LivroModel.create(
        titulo,
        autor,
        anoPublicacao,
        genero,
        sinopse,
        paginas
      );


      res.status(201).json({
        success: true,
        data: novoLivro,
        message: "Novo livro criado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao tentar criar novo livro:", error);
      res.status(500).json({
        success: false,
        error: "Erro do servidor ao tentar criar novo livro",
      });
    }
  }

}

export default new LivroController();