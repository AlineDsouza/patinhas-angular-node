import express from 'express';
import { criaFormularioAdocao, listarFormularios } from '../controllers/adocaoController.js';
// importo as funções do controller de adoção
// criaFormularioAdocao: salva um formulário de adoção
// listarFormularios: retorna todos os formulários cadastrados
const router = express.Router();

router.post('/formulario-adocao', criaFormularioAdocao);
router.get('/formularios', listarFormularios);

export default router;
// export: rotas pra usar no server