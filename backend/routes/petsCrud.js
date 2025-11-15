import mongoose from "mongoose"; // permite o q código converse com o banco de dados Mongodb

// Cria um modelo que diz como os dados de um pet devem ir para o db
const petsCrudSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
});

// Esse modelo utilizado para criar pets no db
export default mongoose.model('pet', petsCrudSchema);