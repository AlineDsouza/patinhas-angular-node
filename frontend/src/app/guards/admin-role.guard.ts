import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {

const router = inject(Router);

// pega a role salva no login
const role = localStorage.getItem('role');

// se não for admin, bloqueia o acesso
if (role !== 'admin') {
  router.navigate(['/login']); // ou '/' se preferir
  return false;
}
// se for admin, permite acesso
return true;
};
