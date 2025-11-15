import express from 'express'; //Cria um servidor web para receber requisições HTTP GET, POST, DELETE, etc..
import dotenv from 'dotenv'; // permite variáveis de ambiente
import mongoose from 'mongoose'; // permite o q código converse com o banco de dados Mongodb

dotenv.config(); //busca um arquivo env | entende o arquivo como variável de ambiente

const app = express(); //variável app será nosso servidor principal
const PORT = 3000; //Define a porta onde o servidor vai rodar ex: http://localhost:3000

//função que tenta conectar ao banco de dados 
const conectaDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI); //process.env.MONGO_URI // Acessa as informações do arquivo .env
        console.log('✅ Conectado ao MongoDB');
    } catch(error) {
        console.log('❌ Erro ao conectar ao MongoDB', error.mensage);
    }
}; 
conectaDB();


//tratar as rotas
app.get('/', (request, response) =>{ //toda request feita pelo navegador é do tipo get   
 res.send('Servidor rodando com Express e MongoDB!');
});

//Inicia o servidor e fica "escutando" na porta 3000 (definida na variável acima)
app.listen(PORT, () => { //arrow funcion
console.log(`O servidor está rodando na porta ${PORT} ✔ `); //mensagem de confirmação 
});
