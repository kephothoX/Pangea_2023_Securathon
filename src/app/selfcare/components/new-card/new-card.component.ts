import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../auth/auth.service';
import { AppService } from 'src/app/services/app.service';
import { Country } from 'src/app/interfaces/country';

import { SquareService } from '../../services/square.service';

import ls from 'localstorage-slim';


@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
  userData?: any;
  Countries?: Country[];

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _squareService: SquareService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._authService.getuserByEmailAddress(`${ ls.get('customer_email_address', { decrypt: true}) }`).subscribe((result: any) => {
      console.log(result);
      this.userData = result.customers[0];
    });

    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result;
    });
  }

  newCardForm = this._formBuilder.group({
    cardholder_name: ['' , Validators.required],
    billingAddress:  this._formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      locality: ['', Validators.required],
      administrative_district_level_1: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
    }),
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    exp_month: ['', Validators.required ],
    exp_year: ['', Validators.required ],
  });

  onSubmit() {
    const formValues = this.newCardForm.value;
    const dataSet = {
      source_id: "cnon:card-nonce-ok",
      idempotency_key: self.crypto.randomUUID(),
      card: {
        cardholder_name: formValues.cardholder_name,
        billing_address: {
          address_line_1: formValues.billingAddress?.address_line_1,
          address_line_2: formValues.billingAddress?.address_line_2,
          locality: formValues.billingAddress?.locality,
          administrative_district_level_1: formValues.billingAddress?.administrative_district_level_1,
          postal_code: formValues.billingAddress?.postal_code,
          country: formValues.billingAddress?.country,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
        },
        customer_id: this.userData.id,
        exp_month: formValues.exp_month,
        exp_year: formValues.exp_year
      }
    }

    console.log(dataSet);

    this._squareService.addNewCard(dataSet).subscribe((result: any ) => {
      console.log(result);
    });
  }

}
