import express from 'express';
import { criaFormularioAdocao } from '../controllers/adocaoController.js';

const router = express.Router();

router.post('/formulario-adocao', criaFormularioAdocao);

export default router;
