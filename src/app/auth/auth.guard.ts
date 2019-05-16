import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isUserAuth:boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authService.isLogged !== 'true') {
        this.router.navigateByUrl('/');
        return false;
      } else if(this.authService.isLogged === 'true'){
        return true;
      }
  }
}
