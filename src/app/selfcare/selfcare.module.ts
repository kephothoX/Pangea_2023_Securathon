import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelfcareRoutingModule } from './selfcare-routing.module'
import { SelfcareComponent } from './selfcare.component'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { LifeCoverComponent } from './components/life-cover/life-cover.component';
import { JumboCoverComponent } from './components/jumbo-cover/jumbo-cover.component';
import { MaxLifeCoverComponent } from './components/max-life-cover/max-life-cover.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { CardsComponent } from './components/cards/cards.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { LocationsComponent } from './components/locations/locations.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CancelSubscriptionComponent } from './components/cancel-subscription/cancel-subscription.component';
import { PauseSubscriptionComponent } from './components/pause-subscription/pause-subscription.component';
import { ResumeSubscriptionComponent } from './components/resume-subscription/resume-subscription.component';
import { UpgradeSubscriptionComponent } from './components/upgrade-subscription/upgrade-subscription.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

@NgModule({
  declarations: [
    SelfcareComponent,
    LifeCoverComponent,
    JumboCoverComponent,
    MaxLifeCoverComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    NewCardComponent,
    CardsComponent,
    PaymentsComponent,
    LocationsComponent,
    InvoicesComponent,
    SubscriptionsComponent,
    CancelSubscriptionComponent,
    PauseSubscriptionComponent,
    ResumeSubscriptionComponent,
    UpgradeSubscriptionComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    SelfcareRoutingModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatTableModule,
    MatProgressSpinnerModule,

  ]
})
export class SelfcareModule { }
