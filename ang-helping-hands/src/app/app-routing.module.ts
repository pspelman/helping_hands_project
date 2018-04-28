import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateComponent} from "./create/create.component";
import {ClaimsComponent} from "./claims/claims.component";

const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'claims', component: ClaimsComponent},
  {path: 'claims/:offer_id', component: ClaimsComponent},
  {path: '', component: HomeComponent }
  // {path: 'details/:helping_hands_offer_id', component: DetailsComponent },
  // {path: 'details', component: DetailsComponent },
  // {path: 'edit', component: EditComponent},
  // {path: 'edit/:helping_hands_offer_id', component: EditComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
