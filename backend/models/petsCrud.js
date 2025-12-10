import mongoose from "mongoose"; // permite o q código converse com o banco de dados Mongodb

// Cria um modelo que diz como os dados de um pet devem ir para o db
const petsCrudSchema = new mongoose.Schema({
    nome:String,
    idade:Number,
    cidade:String,
    descricao:String,
    peso:Number,
    vacinado:Boolean,
    castrado:Boolean,
    raca:String,
    imageUrl: String,
    imageId: String,
    especie: {type: String,enum: ['Cão', 'Gato'],required: true
}

});

// Esse modelo utilizado para pets no db
export default mongoose.model('pet', petsCrudSchema);