import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import utilizador from '../models/utilizador.js';


// REGISTO

// REGISTRAR UTILIZADOR - cria utilizador 
export const registo = async (request, response) => {
    const {nome, email, senha, confirmaSenha} = request.body;

    //validação 
    if(!nome){return response.send('O nome é obrigatório!' )}
    if(!email){return response.send('O e-mail é obrigatório!' )}
    if(!senha){return response.send('A senha é obrigatória!' )}
    if(senha !== confirmaSenha){return response.send('As senhas não são iguais!' )}

    //verificarse o utilizador existe |
    const utilizadorExiste= await utilizador.findOne({email});
    
    if(utilizadorExiste){
        return response.send('Por favor, utilize outro e-mail!' );
    }
    
    // cria senha encriptada
    const salt = await bcrypt.genSalt(12); 
    const senhaHash = await bcrypt.hash(senha,salt);    
    
    try {
        const novoUtilizador = new utilizador({   //criar o utilizador
            nome,
            email,
            senha: senhaHash
        });
        await novoUtilizador.save(); // salva o utilizador no MongoDB
        response.json(novoUtilizador);
        
    } catch (error) {
        response.send('Erro ao criar novo utilizador!', error.message);
    }   
};

//http://localhost:3000/auth/registo rota de teste
//  {"nome": "João", "email": "joao@example.com","senha": "123456", "confirmaSenha": "123456"}

  //http://localhost:3000/auth/login
    //  {"email": "joao@example.com","senha": "123456"}


// LOGIN


export const login = async (request, response) => {
    const {email,senha} = request.body;
    console.log(utilizador); //apagar depois
    

    //VALIDAÇÃO - necessário ter e-mail e senha válida
    if(!email){return response.send('O e-mail é obrigatório!' )}
    if(!senha){return response.send('A senha é obrigatória!' )}
        
    //VERIFICA SE O UTILIZADOR EXISTE
        
    const user= await utilizador.findOne({email});
    console.log(user); //apagar depois
        
    if(!user){
        return response.send('Utilizador não encontrado!' );
    }
        
    // VERIFICAR SENHA - verificar se a senha confere com a da base de dados
    const verificaSenha =  await bcrypt.compare(senha, user.senha);
        
    if(!verificaSenha){
        return response.send("Senha inválida!");
    }  


// VALIDAÇÃO DENTRO DO LOGIN PARA PODER ETREGAR O TOKEN PARA O UTILIZADOR 
    try {
        const secret = process.env.SECRET;
        
        const token = jwt.sign(
            { id: user._id },
            secret,
        );

        return response.json({
            msg: 'Autenticação efetuada com sucesso!',
            token: token
        });

    } catch (error) {
        console.log(error)
        return response.json( 'Login efetuado negado, acesso não autenticado!');
    }
};