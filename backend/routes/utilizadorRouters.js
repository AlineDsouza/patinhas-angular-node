import express from 'express';
import confirmaToken from '../middlewares/confirmaToken.js';

const rotas = express.Router();

import{
    atualizarUtilizador,
    deletaUtilizador,
    buscaUtilizadorId
} from '../controllers/utilizador.js';


rotas.put('/:id', atualizarUtilizador);
rotas.delete('/:id', deletaUtilizador);
rotas.get('/:id', confirmaToken, buscaUtilizadorId);

export default rotas;