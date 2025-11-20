import express from 'express';

const rotas = express.Router();

import{
    criaPet,
    buscaPets,
    editaPet,
    deletaPet
} from '../controllers/pets.js';

rotas.post('/', criaPet);
rotas.get('/', buscaPets);
rotas.put('/:id', editaPet);
rotas.delete('/:id', deletaPet);

export default rotas;