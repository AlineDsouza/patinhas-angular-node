import express from 'express';
import confirmaToken from '../middlewares/confirmaToken.js';
// esse middleware verifica se o usuário está autenticado

const rotas = express.Router();

// importa funções do controller do utilizador
import{
    atualizarUtilizador,
    deletaUtilizador,
    buscaUtilizadorId
} from '../controllers/utilizador.js';

// ROTAS DO UTILIZADOR

rotas.put('/:id', atualizarUtilizador);// recebe um id na URL e atualiza esse utilizador
rotas.delete('/:id', deletaUtilizador);// rota para deletar um utilizador pelo id
rotas.get('/:id', confirmaToken, buscaUtilizadorId);// só acessa se estiver autenticado

export default rotas;
// export: rotas pra usar no server