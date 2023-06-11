import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTableModule } from '@angular/material/table';

import { NewVendorComponent } from './components/new-vendor/new-vendor.component';
import { EditVendorComponent } from './components/edit-vendor/edit-vendor.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { NewLocationComponent } from './components/new-location/new-location.component';
import { NewSubscriptionPlanComponent } from './components/new-subscription-plan/new-subscription-plan.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import { LocationsComponent } from './components/locations/locations.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';



@NgModule({
  declarations: [
    AdminComponent,
    LocationsComponent,
    VendorsComponent,
    MerchantsComponent,
    SubscriptionPlansComponent,
    InvoicesComponent,
    HeaderComponent,
    NewVendorComponent,
    EditVendorComponent,
    EditLocationComponent,
    NewLocationComponent,
    NewSubscriptionPlanComponent,
    SignupComponent,
    SigninComponent,
    EditUserComponent,
    UsersComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatStepperModule,
    MatDividerModule,
    DragDropModule,
    OverlayModule,
    MatTableModule,
  ]
})
export class AdminModule { }
