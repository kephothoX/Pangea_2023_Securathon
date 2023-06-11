import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Subscription } from '../../interfaces/subscription';
import { AuthService } from 'src/app/auth/auth.service';

import { SquareService } from '../../services/square.service';
import ls from 'localstorage-slim';

import * as moment from 'moment';

@Component({
  selector: 'app-resume-subscription',
  templateUrl: './resume-subscription.component.html',
  styleUrls: ['./resume-subscription.component.scss']
})
export class ResumeSubscriptionComponent implements OnInit {
  ChangeTiming: string[] = ['IMMEDIATE', 'END_OF_BILLING_CYCLE'];

  subscription?: Subscription;

  constructor (
    private _squareService: SquareService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(ls.get('active_subscription_id', { decrypt: true })) {
      this._squareService.getSubscriptionById( { id: ls.get('active_subscription_id', { decrypt: true })}).subscribe((result: any) => {
        this.subscription = result.subscription;

      });
    } else {
      this._snackBar.open('You have no Active Subscriptions. Subscribe to Continue..', 'Close');

      setTimeout(() => {
        this._authService.pangeaAuditLog({
          message: `${ls.get('customer_email_address', { decrypt: true })} Resumed Subscription`
        }).subscribe((result: any) => {
          this._snackBar.open(`${result.summary}`, 'Close');
        });
        this._router.navigate(['/selfcare/']);
      }, 1000);

    }
  }


  resumeSubscriptionForm = this._formBuilder.group({
    resume_change_timing: ['', Validators.required],
    resume_effective_date: ['', Validators.required]
  });

  onSubmit() {
    const formValues = this.resumeSubscriptionForm.value;

    const dataSet = {
      subscription_id: ls.get('active_subscription_id', { decrypt: true }),
      dataSet: {
        resume_change_timing: formValues.resume_change_timing,
        resume_effective_date: this.formatDate(formValues.resume_effective_date)
      }
    }

    this._squareService.resumeSubscription(dataSet).subscribe((result: any) => {
      this._snackBar.open('Subscription Resumed Successfully...', 'Close');
      this._router.navigate(['/selfcare/subscriptions/my-invoices']);
    })

  }

  formatDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }


}
