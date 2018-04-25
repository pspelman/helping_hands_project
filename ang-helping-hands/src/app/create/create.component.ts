import { Component, OnInit } from '@angular/core';
import { DataManagerService} from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newStuff: any;
  errorStatus: any;
  Status: any;
  printedErrors: any;
  overallStatus: any;
  private donation_offer: any;

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.newStuff = {Name: "", Item_Name: "", Item_Amount: 0, Email: ""}
  }


  //FIXME: correct the behavior of the offer creation function
  onSubmit() {
    let observable = this._http.createDonationOffer(this.newStuff);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.printedErrors = data['errorStatus'];
      const overallStatus = ('errorStatus' in data);
      console.log("Below is the status")
      console.log(overallStatus);
      if(overallStatus != true){
        this.router.navigateByUrl('');
      }
    })
}
}
