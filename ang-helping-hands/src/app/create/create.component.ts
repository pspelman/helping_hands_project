import { Component, OnInit } from '@angular/core';
import { DataManagerService, OfferModel } from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  errorStatus: any;
  Status: any;
  printedErrors: any;
  overallStatus: any;
  new_offer: OfferModel;
  backend_errors: any;



  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.newOffer = {Name: "", Item_Name: "", Item_Amount: 0, Email: ""}
    this.new_offer = new OfferModel();

  }


  //FIXME: correct the behavior of the offer creation function
  onSubmit() {
    let observable = this._http.createDonationOffer(this.new_offer);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.printedErrors = data['errorStatus'];
      const overallStatus = ('errorStatus' in data);
      console.log("Status: ", overallStatus);
      if (overallStatus != true) {
        this.router.navigateByUrl('');
      }
    });
  }

  navHome() {
    this.router.navigateByUrl('/home');
  }

}
