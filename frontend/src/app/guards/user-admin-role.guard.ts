import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userAdminRoleGuard: CanActivateFn = (route, state) => {

const router = inject(Router);
const role = localStorage.getItem('role');

  // se for user OU admin, libera
  if (role === 'user' || role === 'admin') {
    return true;
  }
  
  // qualquer outro caso, bloqueia/redireciona
  router.navigate(['/login']);
  return false;
};
