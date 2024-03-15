const express = require("express");
const router = express.Router();
const livroDao = require("../modelo/livro-dao");

// Rota para todos os livros - obterLivros
router.get("/", async (req, res) => {
  try {
    const livros = await livroDao.obterLivros();
    res.json(livros);
  } catch (error) {
    console.error("Erro na obtenção dos livros: ", error);
    res.status(500).json({ error: "Erro na obtenção dos livros" });
  }
});

// Rota para incluir - incluir
router.post("/", async (req, res) => {
  try {
    const novoLivro = await livroDao.incluir(req.body);
    if (novoLivro) {
      res.status(201).json({ message: "Livro adicionado com sucesso" });
    } else {
      res.status(400).json({ error: "Erro ao incluir o livro" });
    }
  } catch (error) {
    console.error("Erro na inclusão do livro: ", error);
    res.status(500).json({ error: "Erro ao incluir o livro" });
  }
});

// Rota para excluir - excluir via _id
router.delete("/:codigo", async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const resultado = await livroDao.excluir(codigo);
    if (resultado && resultado.deletedCount === 1) {
      res.json({ message: "Livro deletado com sucesso" });
    } else {
      res.status(400).json({ error: "Erro ao excluir" });
    }
  } catch (error) {
    console.error("Erro ao excluir: ", error);
    res.status(500).json({ error: "Erro ao excluir" });
  }
});

module.exports = router;
