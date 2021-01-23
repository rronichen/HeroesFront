import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  islogin = false;

  constructor(private router: Router, private loginService: LoginService){}

  ngOnInit(): void {

    this.loginService.isLoginSubscription.subscribe(isLogin => {
      this.islogin = isLogin;
    })
  }

  modalLogout() {
    $('#confirmLogout').modal('show');
  }

  logout() {
    this.loginService.logout().subscribe(res=> {
      this.loginService.isLoginSubscription.next(false);
      this.loginService.token.next(null);
      this.router.navigate(['/login']);
    },error=> {
      console.log(error);
    })
    $('#confirmLogout').modal('hide');
  }
}
