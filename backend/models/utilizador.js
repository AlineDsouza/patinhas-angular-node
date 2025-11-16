import mongoose from "mongoose"; // permite o q código converse com o banco de dados Mongodb

// Cria um modelo que diz como os dados de um utilizador devem ir para o db
const utilizadorSchema = new mongoose.Schema({
   nome: { type: String, required: true, trim: true },
   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
   senha: { type: String, required: true, minlength: 6 },
});

// Esse modelo é utilizado para utilizadores no db
export default mongoose.model('utilizador', utilizadorSchema);