import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SquareService } from '../../services/square.service'
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

import { Invoice } from '../../interfaces/invoice';
import { Location } from '../../interfaces/location';

import { MatSnackBar } from '@angular/material/snack-bar';

import ls from 'localstorage-slim';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  locations: Location[]  = [];
  invoices: Invoice[] = [];

  displayedColumns: string[] = ['invoice_number', 'title', 'amount_paid', 'amount_due', 'due_date', 'recipient', 'status']

  constructor(
    private _squareService: SquareService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public _snackBar: MatSnackBar,
  ) {  }

  locationFormGroup = this._formBuilder.group({
    location: ['', Validators.required],
  });



  ngOnInit() {
    this._squareService.listLocations().subscribe((result: any) => {
     this.locations = result.locations;
   });
  }

  getInvoices(location: string | undefined) {
    if(Boolean(ls.get('auth_login_status', { decrypt: true })) == true) {
      this._squareService.getInvoices({ id: location }).subscribe((result: any) => {
        this.invoices = result.invoices;

        setTimeout(() => {
          this._authService.pangeaAuditLog({
            message: `${ls.get('customer_email_address', { decrypt: true })} Accessed Invoices.`
          }).subscribe((result: any) => {
            this._snackBar.open(`${result.summary}`, 'Close');
          });
        });
      });

    } else {
      this._router.navigate(['/selfcare/auth/login']);
    }
  }

}
