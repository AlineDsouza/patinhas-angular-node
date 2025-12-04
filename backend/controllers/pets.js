import petsCrud from '../models/petsCrud.js'; // IMPORTA SCHEMA 
import { v2 as cloudinary } from 'cloudinary'; // IMPORTA CLOUDINARY
//É necessário exportar o curd para que o server.js tenha acesso a essas funções.


// CRUD PETS

// CREATE
// CREATE
export const criaPet = async (request, response) => { 
  try {
    const { nome, idade, cidade, descricao, peso, vacinado, castrado, raca, image } = request.body;

    let imageUrl = null;
    let imageId = null;

    // Upload da imagem SE ela foi enviada
if (image) {
      const upload = await cloudinary.uploader.upload(image, {
        folder: 'pets'
      });
      imageUrl = upload.secure_url;
      imageId = upload.public_id;
    }

    // Criar novo pet no MongoDB
    const novoPet = await petsCrud.create({
      nome,
      idade,
      cidade,
      descricao,
      peso,
      vacinado,
      castrado,
      raca,
      imageUrl, 
      imageId    
    });

    return response.json(novoPet);

  } catch (error) {
    console.error("Erro ao criar pet:", error);
    return response.status(500).json({ error: "Erro ao criar novo pet!" });
  }
}

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
        const { image, ...dadosAtualizados } = request.body;
         const petAtual = await petsCrud.findById(request.params.id);
 // Busca o pet atual
    if (!petAtual) {
      return response.status(404).json({ error: "Pet não encontrado!" });
    }

    let imageUrl = petAtual.imageUrl;
    let imageId = petAtual.imageId;

    
     if (image) {// IMAGEM FOI ENVIADA
      if (imageId) {
        await cloudinary.uploader.destroy(imageId);// Se já existe imagem, deleta do Cloudinary
      }
// Upload da nova imagem
   const upload = await cloudinary.uploader.upload(image, {
                folder: "pets",
            });
        imageUrl = upload.secure_url;
        imageId = upload.public_id;
    }

        // Atualiza o pet no MongoDB
        const petAtualizado = await petsCrud.findByIdAndUpdate(
            request.params.id,
            {
                ...dadosAtualizados,
                imageUrl,
                imageId
            },
            { new: true }
        );

        response.json(petAtualizado);

    } catch (error) {
        console.error("Erro ao atualizar pet:", error);
        response.status(500).json({ error: "Erro ao atualizar pet!" });
    }
};



// DELETE
export const deletaPet = async (request, response) => {

try {
    const pet = await petsCrud.findById(request.params.id);

    if (!pet) {
      return response.status(404).json({ error: "Pet não encontrado!" });
    }

    if (pet.imageId) {
      await cloudinary.uploader.destroy(pet.imageId);
    }

    await petsCrud.findByIdAndDelete(request.params.id);

    response.json({ message: "Pet removido com sucesso!" });

  } catch (error) {
    response.status(500).json({ error: "Erro ao deletar pet!" });
  }
};