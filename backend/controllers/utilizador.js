import utilizador from '../models/utilizador.js'; // IMPORTA SCHEMA DO UTILIZADOR



// ATUALIZA UTILIZADOR
export const atualizarUtilizador = async (request, response) => {
    try {
        const atualizaUtilizador = await utilizador.findByIdAndUpdate(
            request.params.id, // Pega o ID que veio na URL
            request.body, // Pega os novos dados enviados pelo usuário
            {new: true}  // Faz com que o retorno já seja o utilizador atualizado
        ); 
        response.json(atualizaUtilizador);  // Envia o utiliador byid atualizado de volta como resposta
    } catch (error) {
        response.send('Ops! Erro ao atualizar utilizador!');
    }
};


// DELETA UTILIZADOR
export const deletaUtilizador = async (request, response) => {
    try {
        const excluirUtilizador = await utilizador.findByIdAndDelete(
            request.params.id // procura o id e deleta
        ); 
        response.json(excluirUtilizador); 
    } catch (error) {
        response.send('Ops! Erro ao deletar utilizador!');
    }
};



//BUSCA UTILIZADOR POR ID - rota privada
export const buscaUtilizadorId = async (request, response) => {
    const id = request.params.id;

    try {
        const user = await utilizador.findById(id, '-senha'); // verifica se o utilizador existe e exclui a senha da exibição

        if (!user) {
            return response.json('Utilizador não encontrado!');
        }

        return response.json(user); // resposta correta
    } 
    catch (error) {
        console.error(error);
        return response.json( 'Erro ao buscar utilizador');
    }
};


