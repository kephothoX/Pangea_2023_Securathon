import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from '../../interfaces/location';

import { MatSnackBar } from '@angular/material/snack-bar';

import ls from 'localstorage-slim';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  displayedColumns: string[] = ['name', 'description', 'phone_number', 'type', 'status', 'id'];

  constructor(
    private _squareService: SquareService,
    private _authService: AuthService,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this._squareService.listLocations().subscribe((results: any) => {
      this.locations = results.locations;

      setTimeout(() => {
          this._authService.pangeaAuditLog({
            message: `${ls.get('customer_email_address', { decrypt: true })} Accessed Locationss.`
          }).subscribe((result: any) => {
            this._snackBar.open(`${result.summary}`, 'Close');
          });
        });
    });
  }

  deleteLocation(id: string) {

  }

}
