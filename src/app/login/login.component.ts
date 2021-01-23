import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(private loginSrv: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {

    this.isLoading = true;
    this.loginSrv.login(form.value.username ,form.value.password).subscribe(response=> {
      form.resetForm();
      this.isLoading = false;
      this.router.navigate(["./menu"]);
    },error => {
      console.log(error);
      this.isLoading = false;
      $('#errorModal').modal('show');
    });
  }

}
