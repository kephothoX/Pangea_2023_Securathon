import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';


@Injectable({
  providedIn: 'root'
})
export class SelfcareService {

  constructor(
    private _httpClient: HttpClient,
    private _errorService: ErrorService,
  ) { }


  SqEndpoint = 'api/Square_API';

  getCatalogObject(): Observable<any> {
    return this._httpClient.get(`${ this.SqEndpoint}/catalog-object.json`).pipe(catchError(this._errorService.handleError));
  }
}
