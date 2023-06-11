import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CurrencyService } from '../../../services/currency.service';
import { CadenceService } from '../../services/cadence.service';
import { SquareService } from '../../services/square.service';
import { AuthService } from 'src/app/auth/auth.service';

import ls from 'localstorage-slim';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-subscription-plan',
  templateUrl: './new-subscription-plan.component.html',
  styleUrls: ['./new-subscription-plan.component.scss']
})
export class NewSubscriptionPlanComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private _currencyService: CurrencyService,
    private _authService: AuthService,
    private _squareService: SquareService,
    private _cadenceService: CadenceService,
    public _snackBar: MatSnackBar,
  ) {}

  Currency = this._currencyService.Currency;

  Cadence = this._cadenceService.Cadence;

  newSubscriptionPlanForm = this._formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required ],
    cadence: ['', Validators.required],
    currency: ['', Validators.required],
    amount: ['', Validators.required],
    ordinal: ['', Validators.required ]
  });


  onSubmit () {
    let formValues = this.newSubscriptionPlanForm.value;

    let dataSet = {
      "idempotency_key": self.crypto.randomUUID(),
      "object": {
        "type": "SUBSCRIPTION_PLAN",
        "id": `# ${ formValues.id }`,
        "subscription_plan_data": {
          "name": formValues.name,
          "phases": [
            {
              "cadence": formValues.cadence,
              "recurring_price_money": {
                "amount": formValues.amount,
                "currency": formValues.currency
              },
              "ordinal": formValues.ordinal
            }
          ]
        }
      }
    };


    this._squareService.addNewCatalog(dataSet).subscribe((result: any) => {
      this._snackBar.open('New Subscription Plan Created Successfully', 'Close');

      setTimeout(() => {
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address', { decrypt: true })} New Subscription Plan.`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });
      });

      setTimeout(() => {
        this.resetForm();
      }, 1000);

    });
  }

  resetForm() {
    this.newSubscriptionPlanForm.reset();
    window.location.reload();
  }
}
