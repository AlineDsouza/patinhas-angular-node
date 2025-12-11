import mongoose from "mongoose"; // permite o q código converse com o banco de dados Mongodb

// Cria um modelo que diz como os dados do formulário devem ir para o db
const adocaoFormSchema = new mongoose.Schema({
  nomeAdotante: { type: String, required: true, trim: true },
  emailAdotante: { type: String, required: true, trim: true },
  telefone: { type: String, required: true },
  rotinaPet: { type: String, required: true },
  experienciaAnterior: { type: String, required: true },
  disponibilidade: { type: String },
  justificativa: { type: String }
});

// Esse modelo de formulário que irá para a db
export default mongoose.model('AdocaoForm', adocaoFormSchema);