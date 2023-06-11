import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SelfcareService } from '../../services/selfcare.service';
import { SquareService } from '../../services/square.service';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from '../../../auth/auth.service';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-max-life-cover',
  templateUrl: './max-life-cover.component.html',
  styleUrls: ['./max-life-cover.component.scss']
})
export class MaxLifeCoverComponent implements OnInit {
  weeklyAmount?: number;
  monthlyAmount?: number;
  annualAmount?: number;

  isLoggedIn: Boolean = ls.get('auth_login_status', { decrypt: true }) ? true : false;

  constructor(
    private _selfcareService: SelfcareService,
    private _authService: AuthService,
    private _squareService: SquareService,
    private _appService: AppService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) {  }


  ngOnInit() {
    this.getWeeklyMLCSubscriptionAmount();
    this.getMonthlylyMLCSubscriptionAmount();
    this.getAnnualMLCSubscriptionAmount();

  }


  getWeeklyMLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({ id: 'ITAJTCSYUMP2NBBAOZWEISRR' }).subscribe((result: any) => {
      this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getMonthlylyMLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({ id: 'GYW4I57XBBTNM5FSV5JCJEH5' }).subscribe((result: any) => {
      this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getAnnualMLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({ id: 'OI3G6ID2GWQ2RF6OBMMH6QU2' }).subscribe((result: any) => {
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
          "plan_id": "ITAJTCSYUMP2NBBAOZWEISRR",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ls.get('customer_email_address', { decrypt: true })} Subscribed to Max Life Weekly Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${result.summary}`, 'Close');
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
          "plan_id": "GYW4I57XBBTNM5FSV5JCJEH5",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ls.get('customer_email_address', { decrypt: true })} Subscribed to Max Life Monthly Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${result.summary}`, 'Close');
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
          "plan_id": "OI3G6ID2GWQ2RF6OBMMH6QU2",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ls.get('customer_email_address', { decrypt: true })} Subscribed to Max Life Annual Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${result.summary}`, 'Close');
            });

            this._router.navigate(['/selfcare/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }

  }
}
