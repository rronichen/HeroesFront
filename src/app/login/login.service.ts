import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '../Enum';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token = new BehaviorSubject<string>(null);
  isLoginSubscription = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient) { }

  login(user: string, password: string) {

    const body = this.setBody(user, password);
    const header = this.setLoginHeader();

    return this.http.post<any>(API.login ,body,{headers: header})
     .pipe(map(res=> {
        this.token.next(res.access_token);
        localStorage.setItem('user', JSON.stringify(res.access_token));
        this.isLoginSubscription.next(true);
    }));
  };

  logout() {
    const header = this.setLogoutHeader();

    return this.http.post<any>(API.logout ,null, {headers: header})
     .pipe(map(response=> {
        this.token.next(null);
    }));
  }

  private setBody(user, pass) {
    var body = new HttpParams()
      .set('username', user)
      .set('password', pass)
      .set('grant_type', 'password');
      return body;
  };

  private setLoginHeader() {
    var header = new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set("'Access-Control-Allow-Origin","*");
    return header;
  };

  private setLogoutHeader() {
    var header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token.value}`)
    return header;
  };
}
