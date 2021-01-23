import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Hero } from '../hero';
import { HeroesListService } from './heroes-list.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  isLoading = false;
  heroList: Hero[] = [];
  token = "";
  tokenSubscription: Subscription;
  showTimesTrainToday :boolean[]= [];
  trainingHero: Hero;
  selectedHeroIndex: number;

  constructor(private heroListService: HeroesListService, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.tokenSubscription = this.LoginService.token.subscribe(token=> {
      this.token = token;
    });

    this.heroListService.getHeroList(this.token).subscribe(list=> {
      this.isLoading = false;
      this.heroList = list;
      this.setTimesTrainsHero();
      this.sortListByPower();
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }
  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  startTraning(heroId: string) {

    this.trainingHero = this.heroList.filter(hero=> hero.id == heroId)[0];
    this.addRandomPowerToHero();
    this.upDateListProps(heroId);
    this.heroListService.updateHeroPower(this.trainingHero, this.token).subscribe(response=> {
      this.showTimesTrainToday[this.selectedHeroIndex] = true;
      this.sortListByPower();
    },error => {
      console.log(error);
    })
  }

  private setTimesTrainsHero() {
    for(let i = 0; i < this.heroList.length -1 ; i++ ){
      var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
      var heroDateLastTrain =new Date( this.heroList[i].dateLastTrain).getTime();
      if(heroDateLastTrain < today){
        this.heroList[i].timesTrainsToday = 0;
      }
    }
  }

  private upDateListProps(heroId) {
    this.selectedHeroIndex = this.heroList.findIndex(hero=> hero.id == heroId)
    this.heroList[this.selectedHeroIndex].dateLastTrain = new Date();
    this.heroList[this.selectedHeroIndex].timesTrainsToday++;
  }

  private sortListByPower() {
    this.heroList.sort((heroA, heroB)=> {
    if (heroA.currentPower < heroB.currentPower)
      return 1
    else return -1
    })
  }

  private addRandomPowerToHero() {
    var random = Math.random() *10;
    this.trainingHero.currentPower += random * this.trainingHero.currentPower / 100;
  }

}
