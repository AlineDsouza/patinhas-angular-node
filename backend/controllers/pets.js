import petsCrud from '../models/petsCrud.js'; // IMPORTA SCHEMA 
import cloudinary from '../services/cloudinary.js';
//É necessário exportar o curd para que o server.js tenha acesso
import multer from 'multer';
import pkg from 'multer-storage-cloudinary';
const { CloudinaryStorage } = pkg;

// CRUD PETS

// CREATE
export const criaPet = async (request, response) => { 
    
    const { nome, idade, cidade, descricao, peso, vacinado, castrado, raca } = request.body;
    try {
        // Verifica se há arquivo de imagem
         if (!request.file) {
            return response.status(400).json({ error: 'Nenhuma imagem enviada' });
        }
        // Faz o upload da imagem para o Cloudinary
        const result = await cloudinary.uploader.upload(request.file.path, {
           folder: "pets",
        }); 
        //Cria o pet com / mesmos propriedade das models
        const novoPet = await petsCrud.create({
            nome,
            idade,
            cidade,
            descricao,
            peso,
            vacinado,
            castrado,
            raca,
           imageUrl: result.secure_url,
           imageId: result.public_id
        });
        response.json(novoPet); //cria um novo pet, salva no mongodb e devolve o pet criado.
    } catch (error) {
        console.error("error", error)
        response.status(500).json('Erro ao criar novo pet!', error.message);
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
        const petAtual = await petsCrud.findById(request.params.id); // busca o pet por id que contém a foto atual
       
        if (request.file && petAtual?.imageId) {            
            await cloudinary.uploader.destroy(petAtual.imageId);
            
            // atualiza só a imagem, mantém os outros dados
            const atualizaPet = await petsCrud.findByIdAndUpdate(
                request.params.id,
                {
                    imageUrl: request.file.path,      // Nova imagem
                    imageId: request.file.filename    // Novo ID
                },
                { new: true }
            );
            response.json(atualizaPet);
            
        } else {
            const atualizaPet = await petsCrud.findByIdAndUpdate(
                request.params.id,
                request.body,
                { new: true }
            );
            response.json(atualizaPet); // Envia o pet atualizado de volta como resposta
        } 
    } catch (error) {
        response.status(500).send('Erro ao atualizar pet!');
    }
};


// DELETE
export const deletaPet = async (request, response) => {

   try {
        //busca o pet por id e pega o imageId foto no Cloudinary
        const pet = await petsCrud.findById(request.params.id);
        //Verifica se o pet existe E se tem imagem no Cloudinary
        if (pet?.imageId) {
            // deleta a imagem do Cloudinary
            await cloudinary.uploader.destroy(pet.imageId);
        }
       //deleta o pet do banco de dados
       const excluirPet = await petsCrud.findByIdAndDelete(
           request.params.id // procura o id e deleta
       ); 
        response.json(excluirPet); // pet excluído como resposta
    } catch (error) {
        response.status(500).send('Erro ao deletar pet!');
    }

};