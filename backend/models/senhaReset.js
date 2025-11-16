import mongoose from "mongoose"; // permite o q código converse com o banco de dados Mongodb

// Cria um modelo que diz como os dados de um utilizador devem ir para o db
const senhaResetSchema = new mongoose.Schema({
  // continuar aqui
});

// Esse modelo é utilizado para recuperar senha no db
module.exports = mongoose.model('senhaReset', senhaResetSchema);
