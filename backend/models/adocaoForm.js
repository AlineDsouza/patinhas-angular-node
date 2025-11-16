import mongoose from "mongoose"; // permite o q código converse com o banco de dados Mongodb


// Cria um modelo que diz como os dados do formulário devem ir para o db
const adocaoFormSchema = new mongoose.Schema({
     // Dados do adotante
    nomeAdotante: { type: String, required: true, trim: true },
    emailAdotante: { type: String, required: true, trim: true },
    telefone: { type: String, required: true },

     // Informações sobre o pet que deseja adotar
    rotinaPet: { type: String, required: true }, // como será a rotina do pet
    experienciaAnterior: { type: String, required: true }, // já teve outros pets? qual experiência?
    disponibilidade: { type: String }, // quanto tempo o pet ficará sozinho por dia
    justificativa: { type: String }, // por que deseja adotar este pet?

    // Perguntas adicionais sobre a rotina e cuidados
    // por fazer

});

// Esse modelo de formulário que irá para a db
export default mongoose.model('adocaoForm', utilizadorSchema);