import express from 'express';

const rotas = express.Router();

import{
    registo,
    login
} from '../controllers/auth.js';

rotas.post('/registo', registo);
rotas.post('/login', login);

export default rotas;