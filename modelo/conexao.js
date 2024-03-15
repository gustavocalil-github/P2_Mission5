const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/livros");

const banco = mongoose.connection;

banco.on("error", console.error.bind(console, "Erro de conexão com MongoDB:"));
banco.once("open", () =>
  console.log("Conexão efetuada com sucesso com MongoDB.")
);

module.exports = mongoose;
