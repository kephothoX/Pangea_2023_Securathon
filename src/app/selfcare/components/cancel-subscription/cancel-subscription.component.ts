import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SquareService } from '../../services/square.service';
import { AuthService } from 'src/app/auth/auth.service';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.scss']
})
export class CancelSubscriptionComponent implements OnInit {

  constructor (
    private _squareService: SquareService,
    private _authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(ls.get('active_subscription_id', { decrypt: true })) {
      this._squareService.cancelSubscription({ id: ls.get('active_subscription_id', { decrypt: true })}).subscribe((result: any) => {
        this._snackBar.open('Subscription Cancelled...', 'Close');

        setTimeout(() => {
          this._router.navigate(['/selfcare']);
        }, 1000);

      });
    } else {
      this._snackBar.open('You have no Avtive Subscriptions. Subscribe to Continue..', 'Close');

      setTimeout(() => {
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address', { decrypt: true })} Cancelled Subscription`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });
        this._router.navigate(['/selfcare/']);
      }, 1000);

    }

  }

}
