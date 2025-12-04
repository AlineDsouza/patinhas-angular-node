import { v2 as cloudinary } from 'cloudinary'; // Importa cloudinary versão 2 e renomeia - v1 é a versão mais antiga
import dotenv from 'dotenv';
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

// Configura o Cloudinary com as credenciais do arquivo .env

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});
// Exporta o objeto configurado
export default cloudinary;