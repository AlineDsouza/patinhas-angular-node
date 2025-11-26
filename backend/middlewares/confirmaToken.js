import jwt from 'jsonwebtoken';

//Middleware - função que trata as informações recebidas / função que 
// Uso essa função em rotas individuais - nega acesso as rotas que nao tem token
function confirmaToken(request, response, next){
    try{
        const authHeader = request.headers['authorization'] //acessa o header - header é de onde vem o token
        const token = authHeader && authHeader.split(' ')[1]    // é necessário extrair o token | verifica se veio algo e
      
        if(!token){
            return response.send('Acesso negado!');
        }
        //VALIDAR SE  O TOKEN É CORRETO
        
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next()
    }catch(error){
        response.send('Token inválido!');
    }

   
};

export default confirmaToken;