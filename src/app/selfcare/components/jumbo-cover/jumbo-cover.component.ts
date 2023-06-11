import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SelfcareService } from '../../services/selfcare.service';
import { SquareService } from '../../services/square.service';
import { AppService } from 'src/app/services/app.service';

import { AuthService } from 'src/app/auth/auth.service';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-jumbo-cover',
  templateUrl: './jumbo-cover.component.html',
  styleUrls: ['./jumbo-cover.component.scss']
})
export class JumboCoverComponent implements OnInit{
  weeklyAmount?: number;
  monthlyAmount?: number;
  annualAmount?: number;

  isLoggedIn: Boolean  = ls.get('auth_login_status', { decrypt: true })? true : false;

  constructor(
    private _selfcareService: SelfcareService,
    private _squareService: SquareService,
    private _appService: AppService,
    private _authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) {  }


  ngOnInit() {
   this.getWeeklyLCSubscriptionAmount();
   this.getMonthlylyLCSubscriptionAmount();
   this.getAnnualLCSubscriptionAmount();

  }


  getWeeklyLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({id: 'FQNB5FFD6H2JG3IT5TF5A5WS'}).subscribe((result: any) => {
      this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getMonthlylyLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({id: 'Z6LJFR6T3TSWU4KHVHWAUBIX'}).subscribe((result: any) => {
      this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getAnnualLCSubscriptionAmount() {
    this._squareService.getCatalogWithID({id: 'P2BDA6OMZX5TXNYUGPHK5LYR'}).subscribe((result: any) => {
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
          "plan_id": "FQNB5FFD6H2JG3IT5TF5A5WS",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
           this._authService.pangeaAuditLog({
              message: `${ ls.get('customer_email_address')} Subscribed to Jumbo Weekly Subscription`
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
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address', { decrypt: true })} Subscribed to Jumbo Monthly Subscription`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });

        this._router.navigate(['/selfcare/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "Z6LJFR6T3TSWU4KHVHWAUBIX",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ls.get('customer_email_address', { decrypt: true })} Subscribed to Jumbo Annual Subscription`
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
          "plan_id": "P2BDA6OMZX5TXNYUGPHK5LYR",
          "customer_id": ls.get('customer_id', { decrypt: true })

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._snackBar.open('Subscription Successfull.', 'Close');

          setTimeout(() => {
            this._authService.pangeaAuditLog({
              message: `${ls.get('customer_email_address', { decrypt: true })} Subscribed to Jumbo Annual Subscription`
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

