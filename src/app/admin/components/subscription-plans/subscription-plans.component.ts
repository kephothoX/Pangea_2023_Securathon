import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Catalog } from '../../interfaces/catalog';

import { MatSnackBar } from '@angular/material/snack-bar';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  displayedColumns: string[] = ['id', 'version', 'name', 'cadence', 'amount'];
  subscriptions: Catalog[] = [];

  constructor(
    private _squareService: SquareService,
    private _authService: AuthService,
    public _snackBar: MatSnackBar,
  ) {}


  ngOnInit() {
    const qs = {
    "query": {
      "filter": {
        "location_ids": [
          "L65G08M451324"
        ]
      }
    }
  }
    this._squareService.listCatalog().subscribe((result: any) => {
      this.subscriptions = result.objects;

      setTimeout(() => {
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address', { decrypt: true })} Accessed Subscriptions.`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });
      });
    });
  }

}
