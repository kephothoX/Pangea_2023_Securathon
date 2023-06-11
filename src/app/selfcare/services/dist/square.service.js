"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SquareService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var SquareService = /** @class */ (function () {
    function SquareService(_httpClient, _appService, _errorService) {
        this._httpClient = _httpClient;
        this._appService = _appService;
        this._errorService = _errorService;
    }
    SquareService.prototype.newSubscriptionPlan = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareSubscription", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.newSubscriptionPlanOnlineCheckout = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareOnlineSubscriptionCheckout", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getCatalogWithID = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareCatalogObjectByID", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.addNewCard = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareCard", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.generateNewOrder = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareOrder", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.generateNewInvoice = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquareInvoice", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.newPayment = function (payment) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/newSquarePayment", payment, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getSubscriptions = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareSubscriptions", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getCustomerCards = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareCards", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getCard = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareCard", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.disableCard = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/disableSquareCard", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.listLocations = function () {
        return this._httpClient.get(this._appService.FirebaseFunctionsEndpoint + "/getSquareLocations", this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.pauseSubscription = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/pauseSquareSubscription", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.cancelSubscription = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/cancelSquareSubscription", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.resumeSubscription = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/resumeSquareSubscription", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService.prototype.getSubscriptionById = function (data) {
        return this._httpClient.post(this._appService.FirebaseFunctionsEndpoint + "/getSquareSubscriptionByID", data, this._appService.httpOptions).pipe(rxjs_1.catchError(this._errorService.handleError));
    };
    SquareService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SquareService);
    return SquareService;
}());
exports.SquareService = SquareService;
