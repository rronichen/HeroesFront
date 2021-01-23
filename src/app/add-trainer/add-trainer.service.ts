import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API } from '../Enum';

@Injectable({
  providedIn: 'root'
})
export class AddTrainerService {

  constructor(private http : HttpClient) { }

  addUser(newUserEmail: string, password: string){

    // const body = new HttpParams()
    // .set('username', user)
    // .set('password', password)
    // .set('grant_type', 'password');

  const header = new HttpHeaders()
    .set('Content-Type','application/json');

  return this.http.post<any>(API.addUser ,JSON.stringify(
    {
      "email": newUserEmail,
      "password": password,
      "ConfirmPassword": password

    }),{headers: header})
  }
}
