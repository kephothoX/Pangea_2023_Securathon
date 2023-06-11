import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ls from 'localstorage-slim';

import { AuthService } from '../../../auth/auth.service'

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {
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
      ls.set('auth_login_status', false, { encrypt: true});
      window.location.reload();
    } else {
      setTimeout(() => {
        ls.set('auth_login_status', true, { encrypt: true});
        this._router.navigate(['/selfcare']);
      });
    }
    }

  }

  /*ngAfterViewInit() {
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
  */


  signInForm = this._formBuilder.group({
    email_address: ['', Validators.required],
    password: ['', Validators.required],
  });


  async onSubmit() {
    const formValues = this.signInForm.value;
    const email: string = this.signInForm.value.email_address ? this.signInForm.value.email_address: '';
    this.email_address = email;
    const dataSet = {
      email: this.signInForm.value.email_address,
      password: this.signInForm.value.password,
    }

    return this._authService.pangeaLoginWithPassword(dataSet).subscribe((result: any) => {
      this._snackBar.open(`${ result.summary }`, 'Close');
      if (result.status == 'Success') {

        setTimeout(() => {
            this._authService.getuserByEmailAddress(`${result.result.active_token.email}`).subscribe((result: any) => {
              ls.set('customer_id', result.customers[0].id, { encrypt: true });
            });
          });

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
      }

      if (result.status == 'InvalidFlowState') {
        this._snackBar.open('Invalid Flow State', 'Close');
        window.location.reload();
      }
    });
  }

}
