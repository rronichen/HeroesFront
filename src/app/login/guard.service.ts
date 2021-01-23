import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree{
    var  token =this.loginService.token.value;
    if (token != null){
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
     // return this.router.createUrlTree(['/login']);
    }

  }
}
