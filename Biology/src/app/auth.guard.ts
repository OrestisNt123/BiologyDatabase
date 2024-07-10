import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { tap, map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.getLoggedIn().pipe(
    map(isAuth => {
      if (isAuth) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    }),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        console.log('User is not authenticated. Redirecting to login.');
      }
    })
  );
};
