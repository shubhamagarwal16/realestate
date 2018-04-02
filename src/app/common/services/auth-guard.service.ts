import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(){
    if(this.loginService.isLoggedIn()) return true;

    console.log(window.location.pathname);
    
    this.router.navigate(['/'], {
      queryParams: { urltoRedirect: window.location.pathname, action: 'login' } 
    });
    return false;
  }
}
