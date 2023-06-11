import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';
import { SquareService } from '../../services/square.service';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces/country';

import { Payment } from '../../interfaces/payment';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';
  Countries?: Country[];
  Phone_Prefix?: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _router: Router,
    private _squareService: SquareService,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result;
    });
  }

  newSqUserForm = this._formBuilder.group({
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


  newUserCredentialsForm = this._formBuilder.group({
    email_address: ['', Validators.required],
    password: ['', Validators.required],
  });


  mfaVerificationInitForm = this._formBuilder.group({
    flow_id: ls.get('flowID', { decrypt: true }),
    email: ['', Validators.required],
  });

  mfaVerificationForm = this._formBuilder.group({
    flow_id: ls.get('flowID', { decrypt: true }),
    otp_code: ['', Validators.required],
  });

  getEmailAddress(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    this.email_address = email;
  }

  getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }

  addBillingInformation = this._formBuilder.group({

  });

  onSubmitSquareUser() {
    const newUserFormValues = this.newSqUserForm.value;

    const sQUserDataSet = {
      idempotency_key: self.crypto.randomUUID(),
      given_name: newUserFormValues.given_name,
      family_name: newUserFormValues.family_name,
      email_address: newUserFormValues.email_address,
      phone_number: `${this.Phone_Prefix}${newUserFormValues.phone_number}`,
      company_name: newUserFormValues.company_name,

      address: {
        address_line_1: newUserFormValues.address?.address_line_1,
        address_line_2: newUserFormValues.address?.address_line_2,
        locality: newUserFormValues.address?.locality,
        administrative_district_level_1: newUserFormValues.address?.administrative_district_level_1,
        postal_code: newUserFormValues.address?.postal_code,
        country: newUserFormValues.address?.country
      },
    };

    const verificationDetails = {
      amount: '1.00',
      billingContact: {
        addressLines: [newUserFormValues.address?.address_line_1, newUserFormValues.address?.address_line_2],
        familyName: newUserFormValues.family_name,
        givenName: newUserFormValues.given_name,
        email: newUserFormValues.email_address,
        country: newUserFormValues.address?.country,
        phone: `${this.Phone_Prefix}${newUserFormValues.phone_number}`,
        region: newUserFormValues.address?.country,
        city: newUserFormValues.address?.locality,
      },
      currencyCode: 'USD',
      intent: 'CHARGE',
    };

    this._authService.newSquareCustomer(sQUserDataSet).subscribe((result: any) => {
      this._snackBar.open('Square User Created Successfully', 'Close');
    });
  }



  onSubmitUserCredentials() {
    const userCredentials = this.newUserCredentialsForm.value;
    const userDetails = this.newSqUserForm.value;

    return this._authService.pangeaAuthFlowStart({ email: userCredentials.email_address }).subscribe((results: any) => {

      ls.set('flowID', `${results.result.flow_id}`, { encrypt: true });
      const dataSet = {
        flow_id: results.result.flow_id,
        email: userDetails.email_address,
        first_name: userDetails.given_name,
        last_name: userDetails.family_name,
        phone_number: userDetails.phone_number,
        password: userCredentials.password,
      };

      this._authService.pangeaGetFlowState({
        flow_id: results.result.flow_id
      }).subscribe((result: any) => {
        this._snackBar.open(`${ result.summary }`, 'Close');
        if (results.result.next_step == 'verify/password') {
          this._authService.pangeaVerifyPassword({
            flow_id: ls.get('flowID', { decrypt: true }),
            password: userCredentials.password
          }).subscribe((result: any) => {
            this._snackBar.open(`${ result.summary }`, 'Close');
            setTimeout(() => {

              if (result.result.next_step == 'verify/email') {
                this._authService.pangeaVerifyEmail({
                  flow_id: ls.get('flowID', { decrypt: true })
                }).subscribe((result: any) => {
                  this._snackBar.open(`${ result.summary }`, 'Close');
                });
              }

              if (result.result.next_step == 'enroll/mfa/start') {
                this._authService.pangeaStartMFAEnrollment({
                  flow_id: ls.get('flowID', { decrypt: true })
                }).subscribe((result: any) => {
                  this._snackBar.open(`${ result.summary }`, 'Close');
                });
              }

              if (result.result.next_step == 'verify/mfa/start') {
                this._authService.pangeaStartMFAVerification({
                  flow_id: ls.get('flowID', { decrypt: true })
                }).subscribe((result: any) => {
                  this._snackBar.open(`${ result.summary }`, 'Close');
                });
              }
            });
          });

        }

        if (result.result.next_step == 'verify/email') {
          this._authService.pangeaVerifyEmail({
            flow_id: ls.get('flowID', { decrypt: true })
          }).subscribe((result: any) => {
            this._snackBar.open(`${ result.summary }`, 'Close');
          });
        }

        if (result.result.next_step == 'enroll/mfa/start') {
          this._authService.pangeaStartMFAEnrollment({
            flow_id: ls.get('flowID', { decrypt: true })
          }).subscribe((result: any) => {
            this._snackBar.open(`${ result.summary }`, 'Close');
          });
        }


      });



      setTimeout(() => {
        return this._authService.newPangeaUser({
          email: userCredentials.email_address,
          password: userCredentials.password

        }).subscribe((result: any) => {
          if (result.status = 'Success') {
            this._authService.pangeaUpdateUser({
              email: userCredentials.email_address,
              first_name: userDetails.given_name,
              last_name: userDetails.family_name
            }).subscribe((result: any) => {
              this._snackBar.open(`${result.summary}`, 'Close');
            });

          } else if (result.status = 'UserExists') {
            if (result.verified == false) {
              this._authService.pangeaVerifyUser({
                email: userDetails.email_address,
                password: userCredentials.password
              }).subscribe((result: any) => {
                this._snackBar.open(`${ result.summary }`, 'Close');
              });
            }
            this._snackBar.open('A User with that email Exists..', 'Close');
          }

          if(result.result.next_step == 'verify/mfa/start') {
            this._authService.pangeaStartMFAVerification({
              flow_id: ls.get('flowID', { decrypt: true })
            }).subscribe((result: any) => {
              this._snackBar.open(`${ result.summary }`, 'Close');
            });
          }
        });
      }, 1000);



    });
  }

  onSubmitOTP() {
    const formValues = this.mfaVerificationForm.value
    setTimeout(() => {
      this._authService.pangeaVerifyMFAComplete({
        flow_id: ls.get('flowID', { decrypt: true }),
        otp_code: formValues.otp_code
      }).subscribe((result: any) => {
        this._snackBar.open(`${ result.summary }`, 'Close');
        if (result.result.next_step == 'complete') {
          this._authService.pangeaFlowComplete({
            flow_id: ls.get('flowID', { decrypt: true })
          }).subscribe((result: any) => {
            this._snackBar.open(`${ result.summary }`, 'Close');
            if (result.status == 'Success') {
              setTimeout(() => {
                ls.set('auth_login_status', true, { encrypt: true });
                ls.set('user_active_token', `${result.result.active_token.token}`, { encrypt: true });
                ls.set('user_active_token_identity', `${result.result.active_token.id}`, { encrypt: true });
                ls.set('user_active_token_id', `${result.result.active_token.id}`, { encrypt: true });
                ls.set('user_active_token_expire', `${result.result.active_token.expire}`, { encrypt: true });
                ls.set('user_active_token_first_name', `${result.result.active_token.profile.first_name}`, { encrypt: true });
                ls.set('user_active_token_last_name', `${result.result.active_token.profile.last_name}`, { encrypt: true });
                ls.set('user_active_token_phone', `${result.result.active_token.profile.phone}`, { encrypt: true });
                ls.set('customer_email_address', `${result.result.active_token.email}`, { encrypt: true });
                this._router.navigate(['/selfcare']);
              });
            }

            if (result.status == 'InvalidFlowState') {
              this._snackBar.open('Invalid Flow State', 'Close');
              window.location.reload();
            }
          });
        }
      });
    });
  }

  createPayment() {
    const payment: Payment = {
      location_id: ls.get('main_loc', { decrypt: true }),
      source_id: window.sessionStorage.getItem('token'),
      verification_token: window.sessionStorage.getItem('verificationToken'),
      idempotency_key: window.crypto.randomUUID(),
      autocomplete: true,
      note: "Customer Card Verification",
      customer_id: "W92WH6P11H4Z77CTET0RNTGFW8",
      amount_money: {
        amount: 1,
        currency: "USD"
      },
    };
    this._squareService.newPayment(payment).subscribe((result: any) => {
      console.log(result);
    });
  }


  getPayment() {
    this.disable_next = false;
  }


}
