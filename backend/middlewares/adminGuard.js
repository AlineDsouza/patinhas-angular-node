
export default function isAdmin(request, response, next) {
  if (!request.user) return response.status(401).json({ error: 'Não autorizado.' });
  if (request.user.role !== 'admin') return response.status(403).json({ error: 'Requer permissões de administrador.' });
  next();
}
