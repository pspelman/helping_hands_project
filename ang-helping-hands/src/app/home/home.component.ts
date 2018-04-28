import { Component, OnInit } from '@angular/core';
import {DataManagerService, OfferModel} from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
items: Array<any> = [];
  all_offers: Array<OfferModel>=[];

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  title: string = "Helping Hands";

  ngOnInit() {
    this.getAllItems();

  }

  getAllItems(){
    let observable = this._http.getAllOffers();
    observable.subscribe(response => {
      console.log("HomeComponent got our Items!", response);
      this.all_offers = response['offers'];

    });
  }

  onClaim(id: string){
    console.log("You've attempted to claim an Item!")
  }

  navHome() {
    this.router.navigateByUrl('/home');
  }


  getClaim(offer_id: any) {
    this.router.navigateByUrl(`/claims/${offer_id}`);

  }
}
