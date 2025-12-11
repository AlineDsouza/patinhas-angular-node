import AdocaoForm from '../models/adocaoForms.js';

export const criaFormularioAdocao = async (request, response) => {
  try {
    const novoFormulario = new AdocaoForm(request.body);
    await novoFormulario.save();
    response.status(201).json({ msg: 'Formulário enviado com sucesso!' });
  } catch (error) {
    response.status(500).json({ msg: 'Erro ao enviar formulário', erro: error.message });
  }
};

export const listarFormularios = async (request, response) => {
  try {
    const formularios = await AdocaoForm.find();
    response.json(formularios);
  } catch (error) {
    response.status(500).json({ msg: "Erro ao buscar formulários", error });
  }
};
