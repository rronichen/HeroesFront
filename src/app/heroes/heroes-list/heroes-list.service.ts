import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/Enum';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesListService {

  constructor(private http : HttpClient) { }

  getHeroList(token: string) {

    const header = this.setHeaders(token);

  return this.http.get<Hero[]>
    (API.heroes,{headers: header})
  }

  updateHeroPower(hero: Hero, token: string) {

    const header = this.setHeaders(token);

  return this.http.put<Hero>
    (API.heroes + "/" + hero.id ,JSON.stringify(hero),{headers: header})
  }

  private setHeaders(token: string) {
    var header = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type','application/json')
    return header;
  }

}
