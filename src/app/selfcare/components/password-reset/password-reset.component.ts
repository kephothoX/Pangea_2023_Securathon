import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ls from 'localstorage-slim';

import { AuthService } from '../../../auth/auth.service'

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, AfterViewInit {
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    const timeline: string | null = ls.get('user_active_token_expire', { decrypt: true });
    const active_date = new Date().toISOString();
    if(timeline) {
      if(active_date > timeline) {
      ls.set('auth_login_status', false, { decrypt: true});
      window.location.reload();
    } else {
      setTimeout(() => {
        ls.set('auth_login_status', true, { decrypt: true});
        this._router.navigate(['/selfcare']);
      });
    }
    }

  }

  ngAfterViewInit() {
    let element = document.getElementById('googleSignInBtn');

    if (element) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '630879666344-14rl98ful5m0ln3vvivhc5ffa8r2seu7.apps.googleusercontent.com',
        callback: this.googleSignInResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,

      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('googleSignInBtn'),
        { width: 'auto', type: "standard", shape: "pill", theme: "outline", text: "signin_with", size: "large" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    }
  }

  async googleSignInResponse(response: any) {

    console.log(response);
  }


  passwordResetForm = this._formBuilder.group({
    email: ['', Validators.required],
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
  });

  mfaVerificationInitForm = this._formBuilder.group({
    flow_id: ls.get('flowID', { decrypt: true }),
    email: ['', Validators.required],
  });

  mfaVerificationForm = this._formBuilder.group({
    flow_id: ls.get('flowID', { decrypt: true }),
    otp_code: ['', Validators.required],
  });

  async onSubmit() {
    const formValues = this.passwordResetForm.value;
    const email: string = this.passwordResetForm.value.email ? this.passwordResetForm.value.email: '';
    this.email_address = email;

    return this._authService.pangeaAuthFlowStart({ email:  formValues.email }).subscribe((result: any) => {

      ls.set('flowID', `${ result.result.flow_id}`, { encrypt: true });

      if (result.result.next_step == 'verify/password') {
        this._authService.pangeaVerifyPassword({
          flow_id: result.result.flow_id,
          password: formValues.old_password
        }).subscribe((result: any) => {
          if (result.result.next_step == 'enroll/mfa/start') {
            this._authService.pangeaStartMFAEnrollment({
              flow_id: ls.get('flowID', { decrypt: true })
            }).subscribe((result: any) => {
              this._snackBar.open(`${ result.summary }`, 'Close');
            });
          }

          if(result.result.next_step == 'verify/mfa/start') {
            this._authService.pangeaStartMFAVerification({
              flow_id: ls.get('flowID', { decrypt: true })
            }).subscribe((result: any) => {
              this._snackBar.open(`${ result.summary }`, 'Close');
            });
          }
        });
      }
    });
  }

  onSubmitOTP() {
    const formValues = this.mfaVerificationForm.value

    setTimeout(() => {
      this._authService.pangeaVerifyMFAComplete({
        flow_id: formValues.flow_id,
        otp_code: formValues.otp_code
      }).subscribe((result: any) => {
        this._snackBar.open(`${result.summary}`, 'Close');

        if (result.result.next_step == 'complete') {
          this._authService.pangeaFlowComplete({
            flow_id: formValues.flow_id
          }).subscribe((result: any) => {

            if (result.status == 'InvalidFlowState') {
              this._snackBar.open('Invalid Flow State', 'Close');
              setTimeout(() => {
                this._authService.pangeaGetFlowState({
                  flow_id: ls.get('flowID', { decrypt: true })
                }).subscribe((result: any) => {
                  this._snackBar.open(`${result.summary}`, 'Close');
                });
              });
              window.location.reload();
            }

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
              });
              this._authService.pangeaUpdateUserPassword({
                token: result.result.active_token.token,
                old_password: this.passwordResetForm.value.old_password,
                new_password: this.passwordResetForm.value.new_password
              }).subscribe((result: any) => {
                if (result.status == 'Success') {
                  this._snackBar.open(`${result.summary}`, 'Close');
                  setTimeout(() => {
                    this._router.navigate(['/selfcare/auth/signin']);
                  });
                }

                if (result.status == 'InvalidFlowState') {
                  this._snackBar.open('Invalid Flow State', 'Close');
                  setTimeout(() => {
                    this._authService.pangeaGetFlowState({
                      flow_id: ls.get('flowID', { decrypt: true })
                    }).subscribe((result: any) => {
                      this._snackBar.open(`${result.summary}`, 'Close');
                    });
                  });

                  window.location.reload();
                }
              });
            }

            if (result.status == 'InvalidFlowState') {
              this._snackBar.open('Invalid Flow State', 'Close');
              setTimeout(() => {
                this._authService.pangeaGetFlowState({
                  flow_id: ls.get('flowID', { decrypt: true })
                }).subscribe((result: any) => {
                  this._snackBar.open(`${result.summary}`, 'Close');
                });
              });

              window.location.reload();
            }
          });
        }
      });
    });
  }



}

