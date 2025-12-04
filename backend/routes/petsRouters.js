import express from 'express';

import {
  criaPet,
  buscaPets,
  editaPet,
  deletaPet
} from '../controllers/pets.js';

const rotas = express.Router();

rotas.post('/', criaPet);
rotas.get('/', buscaPets);
rotas.put('/:id', editaPet);
rotas.delete('/:id', deletaPet);

export default rotas;
