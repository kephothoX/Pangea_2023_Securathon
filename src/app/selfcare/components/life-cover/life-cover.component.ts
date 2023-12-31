import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelfcareService } from '../../services/selfcare.service';
import { SquareService } from '../../services/square.service';
import { AppService } from 'src/app/services/app.service';

import { AuthService } from '../../../auth/auth.service';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-life-cover',
  templateUrl: './life-cover.component.html',
  styleUrls: ['./life-cover.component.scss']
})
export class LifeCoverComponent implements OnInit {
  weeklyAmount?: number;
  monthlyAmount?: number;
  annualAmount?: number;

  isLoggedIn: Boolean  = ls.get('auth_login_status', { decrypt: true })? true : false;

  constructor(
    private _selfcareService: SelfcareService,
    private _authService: AuthService,
    private _squareService: SquareService,
    private _appService: AppService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) {  }


  ngOnInit() {
   this.getWeeklyLCSubscriptionAmount();
   this.getMonthlylyLCSubscriptionAmount();
   this.getAnnualLCSubscriptionAmount();

  }

  getWeeklyLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({id: 'AEBMKJ7JB2M5WEUDSLD5ZUAO'}).subscribe((result: any) => {
      this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getMonthlylyLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({id: 'AE5AMW7LA7OVJBS2K2KNDOVC'}).subscribe((result: any) => {
      this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getAnnualLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({id: '244VF2OQ5L55AXZMIJH2NGGP'}).subscribe((result: any) => {
      this.annualAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }


  subscribeWeekly() {
    if (ls.get('active_subscription_id')) {
      this._snackBar.open('Already Have An Active Subscription.', 'Close');
      setTimeout(() => {
        this._router.navigate(['/selfcare/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "AEBMKJ7JB2M5WEUDSLD5ZUAO",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ ls.get('customer_email_address', { decrypt: true })} Subscribed to LC Weekly Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${ result.summary }`, 'Close');
            });

            this._router.navigate(['/selfcare/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }

  }

  subscribeMonthly() {
    if (ls.get('active_subscription_id')) {
      this._snackBar.open('Already Have An Active Subscription.', 'Close');
      setTimeout(() => {
        this._router.navigate(['/selfcare/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "AE5AMW7LA7OVJBS2K2KNDOVC",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ ls.get('customer_email_address', { decrypt: true })} Subscribed to LC Monthly Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${ result.summary }`, 'Close');
            });

            this._router.navigate(['/selfcare/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }
  }


  subscribeAnnually() {
    if (ls.get('active_subscription_id')) {
      this._snackBar.open('Already Have An Active Subscription.', 'Close');
      setTimeout(() => {
        this._router.navigate(['/selfcare/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "244VF2OQ5L55AXZMIJH2NGGP",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ ls.get('customer_email_address', { decrypt: true })} Subscribed to LC Annual Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${ result.summary }`, 'Close');
            });

            this._router.navigate(['/selfcare/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }
  }
}
