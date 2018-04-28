import { Component, OnInit } from '@angular/core';
import {ClaimerModel, DataManagerService, OfferModel} from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";




@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  new_claim: ClaimerModel = new ClaimerModel();
  selected_offer: OfferModel = new OfferModel();

  offer_id: any = "";

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.offer_id = params['offer_id'];
      console.log(`got the id: `, this.offer_id);
    });
  }

  ngOnInit() {
    //todo: LOOK UP ITEM BY ID
    let get_offer = this._http.getOfferById(this.offer_id);
    get_offer.subscribe(response => {
      console.log(`Get offer by ID response: `, response);
      this.selected_offer = response['offer'][0];
    });

  }

  navHome() {
    this.router.navigateByUrl('/home');
  }

  submitClaimRequest(id: any) {
    console.log(`Submitting claim for: `,id);

    alert(`thank you, ${this.new_claim.claimer_name}. \n your request for ${this.selected_offer.item_name} is being processed`);

    // let observable = this._http.submitClaimRequest(id);
    // observable.subscribe(response => {
    //   console.log(`response from server after delete request: `,response);
    //   //alert message?
    //
    // });

  }
}
