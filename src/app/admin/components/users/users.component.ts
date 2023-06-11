import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Customer } from '../../interfaces/user';

import { MatSnackBar } from '@angular/material/snack-bar';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Customer[] = [];

  displayedColumns: string[] = ['given_name', 'family_name', 'email_address', 'phone_number', 'company_name', 'id'];

  constructor(
    private _squareService: SquareService,
    private _authService: AuthService,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    (() => {
      this._squareService.getUsers().subscribe((results: any) => {
        this.users = results.customers;

        setTimeout(() => {
          this._authService.pangeaAuditLog({
            message: `${ls.get('customer_email_address', { decrypt: true })} Accessed Users.`
          }).subscribe((result: any) => {
            this._snackBar.open(`${result.summary}`, 'Close');
          });
        });
      });
    })();
  }

  deleteUser(id: string) {
    this._squareService.deleteUser({ id: id }).subscribe((result: any) => {
      this._snackBar.open('User Deleted Successfully.', 'Close');

      setTimeout(() => {
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address')} Deleted User With ID: ${ id }.`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });
      });
      window.location.reload();
    });
  }

}
