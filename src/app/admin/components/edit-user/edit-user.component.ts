import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { EditUser } from '../../../interfaces/user';

import { AuthService } from 'src/app/auth/auth.service';

import { SquareService } from '../../services/square.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user?: EditUser;

  user_id?: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _squareService: SquareService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {}

  editForm = this._formBuilder.group({
    given_name: ['', Validators.required],
    family_name: ['', Validators.required],
    email_address: ['', Validators.required],
    phone_number: ['', Validators.required],
    company_name: ['', Validators.required],

    address: this._formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      locality: ['', Validators.required],
      administrative_district_level_1: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required]
    }),

  });

  ngOnInit() {
    const id = this._activatedRoute.snapshot.params['id'];
    this.user_id = id;

    this._squareService.getUser({ id: id }).subscribe((result: any) => {
      this.user = result.customer;
    });
  }

  onSubmit() {
    const formValues = this.editForm.value;

    const dataSet = {
      id: this.user_id,
      idempotency_key: self.crypto.randomUUID(),
      given_name: formValues.given_name,
      family_email: formValues.family_name,
      email_address: formValues.email_address,
      phone_number: formValues.phone_number,
      company_name: formValues.company_name,

      address: {
        address_line_1: formValues.address?.address_line_1,
        address_line_2: formValues.address?.address_line_2,
        locality: formValues.address?.locality,
        administrative_district_level_1: formValues.address?.administrative_district_level_1,
        postal_code: formValues.address?.postal_code,
        country: formValues.address?.country
      },
    }


    this._squareService.updateUser(dataSet).subscribe((result: any) => {
      this._snackBar.open('User Edited Successfully', 'Close');

      setTimeout(() => {
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address', { decrypt: true })} Edited User with ID: ${ this.user_id }.`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });

        this._router.navigate(['/admin/users']);
      }, 1000);

    });
  }

}


