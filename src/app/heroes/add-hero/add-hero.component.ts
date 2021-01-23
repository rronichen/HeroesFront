import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { AddHeroService } from './add-hero.service';
import { Hero } from '../hero';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit, OnDestroy {

  constructor(private addHeroService: AddHeroService, private LoginService: LoginService) { }

  abilityDropdownValue ="attecker"
  token = "";
  tokenSubscription: Subscription;
  isLoading = false;

  ngOnInit(): void {
    this.tokenSubscription = this.LoginService.token.subscribe(token=> {
      this.token = token;
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  onAddHero(form: NgForm) {

    this.isLoading = true;
    var newHero: Hero = this.initializeHero(form);

    this.addHeroService.addHero(newHero, this.token).subscribe(response => {
      form.resetForm();
      this.isLoading = false;
      $('#heroAddSucssModal').modal('show');
    },error => {
      console.log(error);
      this.isLoading = false;
    })

  }

  private initializeHero(form: NgForm) {
    var newHero: Hero = {
      id : form.value.heroId,
      name : form.value.newHeroName,
      ability : this.abilityDropdownValue,
      startingPower: form.value.startingPower,
      currentPower: form.value.startingPower,
      suitColor: form.value.suitsColors
    }
    return newHero;
  }

}
