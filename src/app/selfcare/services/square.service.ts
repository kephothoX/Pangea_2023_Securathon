import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { Payment } from '../interfaces/payment';
import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }

  newSubscriptionPlan(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/newSquareSubscription`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newSubscriptionPlanOnlineCheckout(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint}/newSquareOnlineSubscriptionCheckout`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogWithID(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/getSquareCatalogObjectByID`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  addNewCard(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint}/newSquareCard`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  generateNewOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint}/newSquareOrder`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  generateNewInvoice(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint}/newSquareInvoice`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newPayment(payment: Payment): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/newSquarePayment`, payment, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));

  }

  getSubscriptions(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/getSquareSubscriptions`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCustomerCards(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/getSquareCards`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCard(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/getSquareCard`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

   disableCard(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/disableSquareCard`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  listLocations(): Observable<any> {
    return this._httpClient.get(`${ this._appService.FirebaseFunctionsEndpoint }/getSquareLocations`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  pauseSubscription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/pauseSquareSubscription`, data,  this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  cancelSubscription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/cancelSquareSubscription`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  resumeSubscription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/resumeSquareSubscription`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

   getSubscriptionById(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.FirebaseFunctionsEndpoint }/getSquareSubscriptionByID`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }




}
