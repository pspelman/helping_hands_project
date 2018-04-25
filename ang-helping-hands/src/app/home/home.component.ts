import { Component, OnInit } from '@angular/core';
import { DataManagerService} from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
Items= [];
  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  title: string = "Helping Hands";

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems(){
    let observable = this._http.getAllOffers();
    observable.subscribe(data => {console.log("HomeComponent got our Items!", data)
    this.Items = data['data'];
    })
  }

  onClaim(id: string){
    console.log("You've attempted to claim an Item!")
  }


}
