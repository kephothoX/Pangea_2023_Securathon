import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { LocationsComponent } from './components/locations/locations.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { NewLocationComponent } from './components/new-location/new-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { NewSubscriptionPlanComponent } from './components/new-subscription-plan/new-subscription-plan.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


import { AuthGuard } from '../auth/admin/auth.guard';


const routes: Routes = [

  { path: '', title: 'Admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', title: 'Admin Signup', component: SignupComponent },
  { path: 'auth/signin', title: 'Admin Login', component: SigninComponent },
  { path: 'auth/password-reset', title: 'Admin Password Reset', component: PasswordResetComponent },

  { path: 'vendors', title: 'Vendors', component: VendorsComponent, canActivate: [AuthGuard] },



  { path: 'invoices', title: 'Invoices', component: InvoicesComponent, canActivate: [AuthGuard]  },

  { path: 'merchants',  title: 'Merchants', component: MerchantsComponent, canActivate: [AuthGuard]  },


  { path: 'locations',  title: 'Locations', component: LocationsComponent, canActivate: [AuthGuard]  },
  { path: 'locations/new-location', title: 'New Location', component: NewLocationComponent, canActivate: [AuthGuard]  },
  { path: 'locations/edit/:id', title: 'Edit Location', component: EditLocationComponent, canActivate: [AuthGuard]  },


  { path: 'subscription-plans', title: 'Subscription Plans', component: SubscriptionPlansComponent, canActivate: [AuthGuard]  },
  { path: 'subscription-plans/new-subscription-plan', title: 'New Subscription Plan', component: NewSubscriptionPlanComponent, canActivate: [AuthGuard]  },


  { path: 'users', title: 'Users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', title: 'Edit User', component: EditUserComponent, canActivate: [AuthGuard] },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
