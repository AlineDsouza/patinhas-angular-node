import express, { request, response } from 'express'; //Cria um servidor web para receber requisições HTTP GET, POST, DELETE, etc..
import dotenv from 'dotenv'; // permite variáveis de ambiente
import mongoose from 'mongoose'; // permite o q código converse com o banco de dados Mongodb
import cors from 'cors';

//CONFIGURAÇÃO DO EXPRESS
dotenv.config(); //busca um arquivo env | entende o arquivo como variável de ambiente

//ROTAS
import petsRouter from './routes/petsRouters.js';
import utilizadorRoutes from './routes/utilizadorRouters.js';
import authRoutes from './routes/authRouters.js';
import adocaoRouters from './routes/adocaoRouters.js';


const app = express(); //variável app será nosso servidor principal
const PORT = 3000; //Define a porta onde o servidor vai rodar ex: http://localhost:3000
//app.use(express.json());  //Middleware - função que trata as informações recebidas - converte as informações p. json
// aceita JSON grande, necessário para imagens 
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Middlewares 
app.use(cors({
    origin: ['http://localhost:4200'], 
  methods: ['GET','POST','PUT','DELETE','UPDATE'],
  credentials: true
}));              // Permite que front acesse a API


//CONEXÃO COM MONGODB - função que tenta conectar ao banco de dados 
const conectaDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI); //process.env.MONGO_URI // Acessa as informações do arquivo .env
        console.log('✅ Conectado ao MongoDB');
    } catch(error) {
        console.log('❌ Erro ao conectar ao MongoDB', error.message);
    }
}; 
conectaDB();

//CONEXÃO DAS ROTAS
app.use('/api/pets', petsRouter);
app.use('/api/utilizador', utilizadorRoutes);
app.use('/auth', authRoutes);
app.use('/api/adocao', adocaoRouters);


//INICIA O SERVIDOR e fica "escutando" na porta 3000 (definida na variável acima)
app.listen(PORT, () => { //arrow funcion
console.log(`O servidor está rodando na porta ${PORT} ✔ `); //mensagem de confirmação 
});








