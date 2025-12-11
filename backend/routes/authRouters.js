import express from 'express';

const rotas = express.Router();

// importa funções do controller auth
import{
    registo,
    login
} from '../controllers/auth.js';

// ROTAS DE AUTENTICAÇÃO
rotas.post('/registo', registo);// rota para registrar novo utilizador
rotas.post('/login', login);// rota para fazer login

export default rotas;
// export: rotas pra usar no server