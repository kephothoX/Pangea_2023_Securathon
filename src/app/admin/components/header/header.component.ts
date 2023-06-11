import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import ls from 'localstorage-slim';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title?: string;

  accountEmail?: string | null | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) {  }

  ngOnInit() {
    this.title = this._activatedRoute.snapshot.routeConfig?.title?.toString();
    this.accountEmail = ls.get('customer_email_address', { decrypt: true });
    console.log(this.accountEmail);
  }


  isMyEmailCompromised() {
    this._authService.pangeaCheckEmailBreach({
      email: this.accountEmail
    }).subscribe((result: any) => {
      if(result.result.data.found_in_breach == false) {
        this._snackBar.open('Your Email is secure.', 'Close')
      }

       if(result.result.data.found_in_breach == true) {
        this._snackBar.open('Your Email is Compromised.', 'Close')
      }

    });
  }

  logOutUser() {
    this._authService.pangeaLogoutUser({
      token: ls.get('user_active_token', { decrypt: true})
    }).subscribe((result: any) => {
      if (result.status == 'Success') {
        this._snackBar.open('You are Now Logged Out. Login To Continue.', 'Close');
        ls.remove('customer_id');
        ls.remove('customer_email_address');
        ls.remove('active_route');
        ls.remove('active_subscription_id');
        ls.set('canLoginAsAdmin', false, { encrypt: true });
        ls.remove('user_active_token');
        ls.remove('user_active_token_id');
        ls.remove('user_active_token_identity');
        ls.remove('user_active_token_expire');
        ls.remove('user_active_token_first_name');
        ls.remove('user_active_token_last_name');
        ls.remove('user_active_token_phone');

        setTimeout(() => {
          this._router.navigate(['/admin/auth/signin']);
        });
      }
    });
  }

}
