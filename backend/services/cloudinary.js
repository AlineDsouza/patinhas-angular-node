import { v2 as cloudinary } from 'cloudinary'; // Importa cloudinary versão 2 e renomeia - v1 é a versão mais antiga
import dotenv from 'dotenv'; //Possibilita usar variáveis de ambiente

dotenv.config(); 
// Carrega variáveis de ambiente do arquivo .env

// cloudinary configurado com minhas credenciais
// essas infos estão no .env pra não ficar exposto no código
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

// exporta o objeto configurado
export default cloudinary;