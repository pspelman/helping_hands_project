import { Component, OnInit } from '@angular/core';
import { DataManagerService} from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private donation_offer: any;

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }


  //FIXME: correct the behavior of the offer creation function
  createNewOffer() {

    let observable = this._http.createDonationOffer(this.donation_offer);
    observable.subscribe(server_response => {
      console.log(`Attempted to create donation. Server response: `, server_response);

    });
  }
}
