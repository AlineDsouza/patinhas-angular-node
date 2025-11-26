import express from 'express';

const rotas = express.Router();

import{
    criaPet,
    buscaPets,
    editaPet,
    deletaPet
} from '../controllers/pets.js';
import upload from '../services/multer.js';

rotas.post('/',upload.single('image'), criaPet);
rotas.get('/', buscaPets);
rotas.put('/:id',upload.single('image'), editaPet);
rotas.delete('/:id', deletaPet);

export default rotas;