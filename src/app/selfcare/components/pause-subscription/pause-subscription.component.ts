import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SquareService } from '../../services/square.service';
import { AuthService } from 'src/app/auth/auth.service';
import ls from 'localstorage-slim';

import * as moment from 'moment';

@Component({
  selector: 'app-pause-subscription',
  templateUrl: './pause-subscription.component.html',
  styleUrls: ['./pause-subscription.component.scss']
})
export class PauseSubscriptionComponent implements OnInit {
  ChangeTiming: string[] = ['IMMEDIATE', 'END_OF_BILLING_CYCLE'];

  constructor (
    private _squareService: SquareService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(ls.get('active_subscription_id', { decrypt: true })) {
      return;
    } else {
      this._snackBar.open('You have no Active Subscriptions. Subscribe to Continue..', 'Close');

      setTimeout(() => {
        this._router.navigate(['/selfcare/']);
      });

    }
  }

  pauseSubscriptionForm = this._formBuilder.group({
    //pause_cycle_duration: ['', Validators.required ],
    pause_effective_date: ['', Validators.required ],
    pause_reason: ['', Validators.required ],
    resume_change_timing: ['', Validators.required ],
    resume_effective_date: ['', Validators.required ],
  });


  onSubmit() {
    const formValues = this.pauseSubscriptionForm.value;

    const dataSet = {
      subscription_id: ls.get('active_subscription_id', { decrypt: true }),
      dataSet: {
        resume_change_timing: formValues.resume_change_timing,
        pause_reason: formValues.pause_reason,
       // pause_cycle_duration: formValues.pause_cycle_duration,
        pause_effective_date: this.formatDate(formValues.pause_effective_date),
        resume_effective_date: this.formatDate(formValues.resume_effective_date),
      }
    }

    this._squareService.pauseSubscription(dataSet).subscribe((result: any) => {
      this._snackBar.open('Subscription Paused...', 'Close');

      setTimeout(() => {
        this._authService.pangeaAuditLog({
              message: `${ls.get('customer_email_address', { decrypt: true })} Paused Subscription`
            }).subscribe((result: any) => {
              this._snackBar.open(`${result.summary}`, 'Close');
            });
        this._router.navigate(['/selfcare']);
      });

    });

  }

  formatDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

}
