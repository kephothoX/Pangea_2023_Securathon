import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfcareComponent } from './selfcare.component';
import { LifeCoverComponent } from './components/life-cover/life-cover.component';
import { JumboCoverComponent } from './components/jumbo-cover/jumbo-cover.component';
import { MaxLifeCoverComponent } from './components/max-life-cover/max-life-cover.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CardsComponent } from './components/cards/cards.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { LocationsComponent } from './components/locations/locations.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { PauseSubscriptionComponent } from './components/pause-subscription/pause-subscription.component';
import { CancelSubscriptionComponent } from './components/cancel-subscription/cancel-subscription.component';
import { ResumeSubscriptionComponent } from './components/resume-subscription/resume-subscription.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

import { AuthGuard } from '../auth/user/auth.guard';

const routes: Routes = [

  { path: '', title: 'Healus Insurance', component: SelfcareComponent },
  { path: 'selfcare', title: 'Healus Insurance', component: SelfcareComponent },
  { path: 'life-cover', title: 'Life Cover', component: LifeCoverComponent, canActivate: [AuthGuard] },
  { path: 'jumbo-cover', title: 'Jumbo Cover', component: JumboCoverComponent, canActivate: [AuthGuard] },
  { path: 'max-life-cover', title: 'Max-Life Cover', component: MaxLifeCoverComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', title: 'Register', component: SignupComponent },
  { path: 'auth/signin', title: 'Login', component: SigninComponent },
  { path: 'auth/reset-password', title: 'Reset Password', component: PasswordResetComponent },
  { path: 'billing/payments', title: 'Billing (Payments)', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'billing/cards', title: 'Billing (Manage cards)', component: CardsComponent, canActivate: [AuthGuard] },
  { path: 'billing/new-card', title: 'Billing (New Card)', component: NewCardComponent, canActivate: [AuthGuard] },

  { path: 'partners', title: 'Our Partners', component: LocationsComponent },
  { path: 'send-invoice', title: 'Request Payment', component: InvoicesComponent },

  { path: 'subscriptions/my-invoices', title: 'My Invoices', component: SubscriptionsComponent, canActivate: [AuthGuard] },
  { path: 'subscriptions/pause-subscription', title: 'Pause Subscription', component: PauseSubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'subscriptions/cancel-subscription', title: 'Cancel Subscription', component: CancelSubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'subscriptions/resume-subscription', title: 'Resume Subscription', component: ResumeSubscriptionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelfcareRoutingModule { }
