import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Utilizador from '../models/utilizador.js';


// REGISTO - cria utilizador 
export const registo = async (request, response) => {
    const {nome, email, senha, confirmaSenha} = request.body;

    //validação 
    if (!nome) {
        return response.status(400).json({ msg: "O nome é obrigatório!" });
    }
    if (!email) {
        return response.status(400).json({ msg: "O e-mail é obrigatório!" });
    }
    if (!senha) {
        return response.status(400).json({ msg: "A senha é obrigatória!" });
    }
    if (senha !== confirmaSenha) {
        return response.status(400).json({ msg: "As senhas não são iguais!" });
    }

    //verificarse o utilizador existe |
    const utilizadorExiste= await Utilizador.findOne({email});
    
    if (utilizadorExiste) {
        return response.status(409).json({ msg: "Por favor, utilize outro e-mail!" });
    }
    
    // cria senha encriptada
    const salt = await bcrypt.genSalt(12); 
    const senhaHash = await bcrypt.hash(senha,salt);    
    
    try {
        const novoUtilizador = new Utilizador({   //criar o utilizador
            nome,
            email,
            senha: senhaHash,
            role:'user' // tipo de utilizador criado por padrão
        });
        await novoUtilizador.save(); // salva o utilizador no MongoDB
        
        return response.status(201).json({
            msg: "Utilizador criado com sucesso!",
            id: novoUtilizador._id,
            role: novoUtilizador.role
        });
        
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: "Erro ao criar novo utilizador!" });
    }   
};


// LOGIN
export const login = async (request, response) => {
    const {email,senha} = request.body;

    //VALIDAÇÃO - necessário ter e-mail e senha válida
    if(!email){return response.status(400).json({ msg: "O e-mail é obrigatório!" });}
    if(!senha){ return response.status(400).json({ msg: "A senha é obrigatória!" });}
        
    //VERIFICA SE O UTILIZADOR EXISTE  
    const user= await Utilizador.findOne({email});
        
    if(!user){
       return response.status(404).json({ msg: "Utilizador não encontrado!" });
    }
        
    // VERIFICAR SENHA - verificar se a senha confere com a da base de dados
    const verificaSenha =  await bcrypt.compare(senha, user.senha);
        
    if(!verificaSenha){
        return response.status(400).json({ msg: "Senha inválida!" });
    }  

// VALIDAÇÃO DENTRO DO LOGIN PARA PODER ETREGAR O TOKEN PARA O UTILIZADOR 
    try {
        const secret = process.env.SECRET;
        
        const token = jwt.sign({ id: user._id },secret);


         return response.status(200).json({
            msg: "Autenticação efetuada com sucesso!",
            token: token,
            role: user.role?.toLowerCase()?.trim(),
            nome: user.nome,
            email: user.email
        });

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            msg: "Login negado, acesso não autenticado!"
        });
    }
};