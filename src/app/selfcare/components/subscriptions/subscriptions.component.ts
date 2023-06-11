import { Component, OnInit } from '@angular/core';
import { SquareService } from '../../services/square.service'
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../interfaces/invoice';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  invoices: Invoice[] = [];

  displayedColumns: string[] = ['invoice_number', 'title', 'created_at', 'subscription_amount', 'amount_paid', 'due_date', 'status', 'public_url']

  constructor(
    private _squareService: SquareService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) {
    ls.set('active_route', `${ this._router.routerState.snapshot.url }`, { encrypt: true} );
  }


  ngOnInit() {
    if(Boolean(ls.get('auth_login_status', { decrypt: true })) == true) {
      const qs = {
        "query": {
          "filter": {
            "customer_ids": [
              `${ ls.get('customer_id', { decrypt: true }) }`
            ],
            "location_ids": [
              `${ ls.get('main_loc', { decrypt: true }) }`
            ]
          }
        }
      };

      this._squareService.getSubscriptions(qs).subscribe((result: any) => {
        this.invoices = result.invoices;

        ls.set('active_subscription_id', `${ result.invoices[0].subscription_id}`, { encrypt: true });

      });

    } else {
      this._router.navigate(['/selfcare/auth/login']);
    }

  }

}
