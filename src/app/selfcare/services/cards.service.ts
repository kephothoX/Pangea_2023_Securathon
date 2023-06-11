import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ErrorService } from 'src/app/services/error.service';
import { AppService  } from 'src/app/services/app.service';

import { Observable, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private _httpClient: HttpClient,
    private _errorService: ErrorService,
    private _appService: AppService,
  ) { }

  SqEndpoint = 'api/Square_API';




  editCard(data: any): Observable<any> {
    const card_id: string = '';
    return this._httpClient.post(`${ this.SqEndpoint}/edit-card/${ card_id }`, data).pipe(catchError(this._errorService.handleError));
  }

  getCards(): Observable<any> {
    return this._httpClient.get(`${ this.SqEndpoint }/cards.json`).pipe(catchError(this._errorService.handleError));
  }

  getCard(): Observable<any> {
    return this._httpClient.get(`${ this.SqEndpoint }/card.json`).pipe(catchError(this._errorService.handleError));
  }
}
