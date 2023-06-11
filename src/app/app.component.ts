import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';

import { AppService } from './services/app.service';
import { SquareService } from './admin/services/square.service';


import ls  from 'localstorage-slim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Healus';

  constructor(
    private _appService: AppService,
    private _squareService: SquareService,
  ){

  }

  ngOnInit() {

    this.getBusinessDetails();
  }


  getBusinessDetails() {
    this._appService.listMerchants().subscribe((results: any) => {
      ls.set('main_loc', results.merchant[0].main_location_id, { encrypt: true });
    });
  }
}
