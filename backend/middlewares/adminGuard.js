
export default function isAdmin(request, response, next) { 
  // verifica se existe um utilizador na requisição

  // isso só existe se o token já foi validado antes
  if (!request.user) 
    return response.status(401).json({ error: 'Não autorizado.' });

   // agora verifico se o usuário tem a role admin
  if (request.user.role !== 'admin') 
    // tem login, mas não tem permissão suficiente
    return response.status(403).json({ error: 'Requer permissões de administrador.' });

  // se passar pelas duas verificações, pode continuar
  next();
}
