import jwt from 'jsonwebtoken';
// jwt serve para verificar se o token é válido

// Uso essa função em rotas individuais - nega acesso as rotas que nao tem token
function confirmaToken(request, response, next) {
    try {
        const authHeader = request.headers['authorization'] //acessa o header - header é de onde vem o token
        const token = authHeader && authHeader.split(' ')[1] // é necessário extrair o token | verifica se veio algo

        // se não veio token, não pode acessar a rota
        if (!token) {
            return response.send('Acesso negado!');
        }

        //VALIDA SE  O TOKEN É CORRETO
        const secret = process.env.SECRET; // pego o secret do .env
        jwt.verify(token, secret); // verifica se o token foi criado com esse secret
        next()
    } catch (error) {
        response.send('Token inválido!');
    }
};

export default confirmaToken;