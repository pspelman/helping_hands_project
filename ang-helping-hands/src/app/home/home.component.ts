import { Component, OnInit } from '@angular/core';
import { DataManagerService} from "../data-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) { }

  title: string = "Helping Hands";

  ngOnInit() {

  }

  //TODO: request offers

}
