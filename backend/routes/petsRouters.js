import express from 'express';

// importa funções do controller de pets
import {
  criaPet,
  buscaPets,
  editaPet,
  deletaPet,
  pegaPetId
} from '../controllers/pets.js';

const rotas = express.Router();

// ROTAS DO Pet

rotas.post('/', criaPet);// rota para criar um pet
rotas.get('/', buscaPets);// rota para listar todos os pets
rotas.get('/:id', pegaPetId);// rota para pegar um pet específico pelo ID
rotas.put('/:id', editaPet);// rota para editar um pet existente
rotas.delete('/:id', deletaPet);// rota para deletar um pet pelo ID

export default rotas;
// export: rotas pra usar no server
