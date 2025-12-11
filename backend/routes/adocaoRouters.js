import express from 'express';
import { criaFormularioAdocao, listarFormularios } from '../controllers/adocaoController.js';

const router = express.Router();

router.post('/formulario-adocao', criaFormularioAdocao);
router.get('/formularios', listarFormularios);

export default router;
