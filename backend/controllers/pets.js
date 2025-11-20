import petsCrud from '../models/petsCrud.js'; // IMPORTA SCHEMA 

//É necessário exportar o curd para que o server.js tenha acesso

// CRUD PETS

// CREATE
export const criaPet = async (request, response) => { //exporta essa rota para o server.js
    try {
        const novoPet = await petsCrud.create(request.body);
        response.json(novoPet); //cria um novo pet, salva no mongodb e devolve o pet criado.
    } catch (error) {
        response.send('Erro ao criar novo pet!', error.message);
    }
};


// READ
export const buscaPets = async (request, response) => {
     try {
        const buscaPet = await petsCrud.find();  // Busca todos os pets no banco find()
        response.json(buscaPet);  // Envia a lista de pets de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao buscar pet!');
    }
};


// UPDATE
export const editaPet = async (request, response) => {
    try {
        const atualizaPet = await petsCrud.findByIdAndUpdate(
            request.params.id, // Pega o ID que veio na URL
            request.body, // Pega os novos dados enviados pelo usuário
            {new: true}  // Faz com que o retorno já seja o pet atualizado
        ); 
        response.json(atualizaPet);  // Envia o pet atualizado de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao atualizar pet!');
    }
};


// DELETE
export const deletaPet = async (request, response) => {
   try {
        const excluirPet = await petsCrud.findByIdAndDelete(
            request.params.id // procura o id e deleta
        ); 
        response.json(excluirPet); 
    } catch (error) {
        response.send('Ops! Erro ao deletar pet!');
    }
};



