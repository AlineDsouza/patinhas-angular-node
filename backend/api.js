import express, { request, response } from 'express'; //Cria um servidor web para receber requisições HTTP GET, POST, DELETE, etc..
import dotenv from 'dotenv'; // permite variáveis de ambiente
import mongoose from 'mongoose'; // permite o q código converse com o banco de dados Mongodb
import petsCrud from './models/petsCrud.js'; //importa o 'modelo' feito em petsCrud.js
import utilizador from './models/utilizador.js';

dotenv.config(); //busca um arquivo env | entende o arquivo como variável de ambiente

const app = express(); //variável app será nosso servidor principal
const PORT = 3000; //Define a porta onde o servidor vai rodar ex: http://localhost:3000

//Middleware - função que trata as informações recebidas - converte as informações p. json
app.use(express.json()); 

//função que tenta conectar ao banco de dados 
const conectaDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI); //process.env.MONGO_URI // Acessa as informações do arquivo .env
        console.log('✅ Conectado ao MongoDB');
    } catch(error) {
        console.log('❌ Erro ao conectar ao MongoDB', error.message);
    }
}; 
conectaDB();


// CRUD PETS

//CREATE
app.post("/api/pets", async (request,response) =>{ //cria um novo pet, salva no mongodb e devolve o pet criado.
    try {
        const novoPet = await petsCrud.create(request.body);
        response.json(novoPet);
    } catch (error) {
        response.send('Erro ao criar novo pet!', error.message);
    }
});

// READ
app.get("/api/pets", async(request,response) =>{ //
    try {
        const buscaPet = await petsCrud.find();  // Busca todos os pets no banco find()
        response.json(buscaPet);  // Envia a lista de pets de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao buscar pet!');
    }
});

//UPDATE
app.put("/api/pets/:id", async(request,response) =>{ // busca pelo id qual objeto vai ser atualizado
    try {
        const atualizaPet = await petsCrud.findByIdAndUpdate(
            request.params.id, // Pega o ID que veio na URL
            request.body, // Pega os novos dados enviados pelo usuário
            {new: true}  // Faz com que o retorno já seja o pet atualizado
        ); 
        response.json(atualizaPet);  // Envia o pet atualizado de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao atualizar pet!');
    }
});

//DELETE
app.delete("/api/pets/:id", async(request,response) =>{ // busca pelo id qual objeto vai ser deletado
    try {
        const excluirPet = await petsCrud.findByIdAndDelete(
            request.params.id // procura o id e deleta
        ); 
        response.json(excluirPet); 
    } catch (error) {
        response.send('Ops! Erro ao deletar pet!');
    }
});



//CRUD UTILIZADOR
 
//CREATE
app.post("/api/utilizador", async (request,response) =>{ //cria um novo utilizador e salva no mongodb
    try {
        const novoUtilizador = await utilizador.create(request.body);
        response.json(novoUtilizador);
    } catch (error) {
        response.send('Erro ao criar novo utilizador!', error.message);
    }
});

// READ UTIZADOR
app.get("/api/utilizador", async(request,response) =>{ //
    try {
        const buscaUtilizador = await utilizador.find();  // Busca todos os utilizadores no banco find()
        response.json(buscaUtilizador);  // Envia a lista de utilizadores de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao buscar utiizador!');
    }
});

//UPDATE UTIZADOR
app.put("/api/utilizador/:id", async(request,response) =>{ // busca pelo id qual objeto vai ser atualizado
    try {
        const atualizaUtilizador = await utilizador.findByIdAndUpdate(
            request.params.id, // Pega o ID que veio na URL
            request.body, // Pega os novos dados enviados pelo usuário
            {new: true}  // Faz com que o retorno já seja o utilizador atualizado
        ); 
        response.json(atualizaUtilizador);  // Envia o utiliador byid atualizado de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao atualizar utilizador!');
    }
});

//DELETE UTIZADOR
app.delete("/api/utilizador/:id", async(request,response) =>{ // busca pelo id qual objeto vai ser deletado
    try {
        const excluirUtilizador = await utilizador.findByIdAndDelete(
            request.params.id // procura o id e deleta
        ); 
        response.json(excluirUtilizador); 
    } catch (error) {
        response.send('Ops! Erro ao deletar utilizador!');
    }
});





//Inicia o servidor e fica "escutando" na porta 3000 (definida na variável acima)
app.listen(PORT, () => { //arrow funcion
console.log(`O servidor está rodando na porta ${PORT} ✔ `); //mensagem de confirmação 
});
