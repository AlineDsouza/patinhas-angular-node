import AdocaoForm from '../models/adocaoForms.js';

// função para criar um novo formulário
export const criaFormularioAdocao = async (request, response) => {
  try {
    // cria um novo documento usando os dados que vieram no body
    const novoFormulario = new AdocaoForm(request.body);
    await novoFormulario.save(); // salvo na base de dados
    response.status(201).json({ msg: 'Formulário enviado com sucesso!' }); // retorna mensagem de sucesso
  } catch (error) {
    response.status(500).json({ msg: 'Erro ao enviar formulário', erro: error.message });
  }
};

// função para listar todos os formulários enviados
export const listarFormularios = async (request, response) => {
  try {
    // busca todos os formulários na base de dados
    const formularios = await AdocaoForm.find();
    response.json(formularios);  // retorna a lista
  } catch (error) {
    response.status(500).json({ msg: "Erro ao buscar formulários", error });
  }
};
