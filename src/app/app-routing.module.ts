import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { AddHeroComponent } from './heroes/add-hero/add-hero.component';
import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { GuardServiceService } from './login/guard.service';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu',canActivate: [GuardServiceService], component: MenuComponent },
  { path: 'addTrainer',canActivate: [GuardServiceService], component: AddTrainerComponent },
  { path: 'heroesList',canActivate: [GuardServiceService], component: HeroesListComponent },
  { path: 'addHero',canActivate: [GuardServiceService], component: AddHeroComponent },
  { path: '**',redirectTo: "menu" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
