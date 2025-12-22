import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userRoleGuard: CanActivateFn = (route, state) => {

const router = inject(Router);
const role = localStorage.getItem('role');

  // se NÃO for user, bloqueia acesso
if (role !== 'user') {
  router.navigate(['/login']);
  return false;
  }
// se for user, libera
return true;
};
