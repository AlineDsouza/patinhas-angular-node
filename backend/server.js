import express, { request, response } from 'express'; 
// cria um servidor web para receber requisições HTTP GET, POST, DELETE, etc..
import dotenv from 'dotenv';
// permite usar variáveis de ambiente
import mongoose from 'mongoose';
// permite o q código converse com o banco de dados Mongodb
import cors from 'cors';
// cors permite que o front consiga acessar essa API

// CONFIG DO EXPRESS
dotenv.config(); //busca um arquivo env | entende o arquivo como variável de ambiente

//ROTAS
import petsRouter from './routes/petsRouters.js'; // rotas dos pets
import utilizadorRoutes from './routes/utilizadorRouters.js';  // rotas dos utilizadores
import authRoutes from './routes/authRouters.js'; // rotas de login e registo
import adocaoRouters from './routes/adocaoRouters.js'; // rotas de adoção


const app = express(); 
// cria o servidor com express (variável app representa o servidor) 
const PORT = 3000;
//Define a porta onde o servidor vai rodar


app.use(express.json({ limit: "15mb" })); //entender dados enviados em JSON
app.use(express.urlencoded({ limit: "15mb", extended: true })); //limite 15mb maior pq as imagens ocupam mais espaço
//entender dados enviados em formulários, tipo quando você envia algo do HTML


// CONFIG CORS
app.use(cors({
    origin: ['http://localhost:4200'], // Permite que front acesse a API
    methods: ['GET','POST','PUT','DELETE','UPDATE'], // métodos permitido
    credentials: true// permite trabalhar com autenticação
}));              

//CONEXÃO COM MONGODB
const conectaDB = async () =>{ // função que tenta conectar ao banco de dados 
    try{
        await mongoose.connect(process.env.MONGO_URI); 
        // acessa as informações do arquivo .env (process.env.MONGO_URI)
        console.log('Conectado ao MongoDB');
    } catch(error) {
        console.log('Erro ao conectar ao MongoDB', error.message); 
        // se der erro aparecerá isto aqui
    }
}; 
conectaDB();
// chamando a função para conectar

// CONEXÃO DAS ROTAS
// defino qual arquivo cada rota deve usar
app.use('/api/pets', petsRouter);
app.use('/api/utilizador', utilizadorRoutes);
app.use('/auth', authRoutes);
app.use('/api/adocao', adocaoRouters);

// INICIA O SERVIDOR
// fica "escutando" na porta 3000 (definida na variável acima)
app.listen(PORT, () => {
console.log(`O servidor está rodando na porta`);
});
