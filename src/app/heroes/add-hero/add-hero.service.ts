import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/Enum';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})
export class AddHeroService {

  constructor(private http : HttpClient) { }

  addHero(newHero: Hero, token: string){

    const header = this.setHeader(token);

  return this.http.post<Hero>
    (API.heroes,JSON.stringify(newHero),{headers: header})
  }

  private setHeader(token) {
    var header = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type','application/json')
    return header;
  }
}
