"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewLocationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var js_api_loader_1 = require("@googlemaps/js-api-loader");
var localstorage_slim_1 = require("localstorage-slim");
var NewLocationComponent = /** @class */ (function () {
    function NewLocationComponent(_formBuilder, _squareService, _authService, _snackBar) {
        this._formBuilder = _formBuilder;
        this._squareService = _squareService;
        this._authService = _authService;
        this._snackBar = _snackBar;
        this.visibility = 'hidden';
        this.isOpen = false;
        this.scheduleCount = new Array('newSchedule');
        this.schedule = new Array();
        this.daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        this.AddressType = ['PHYSICAL', 'MOBILE'];
        this.API_KEY = '*****************************************************';
        this.MapChoice = '';
        this.loader = new js_api_loader_1.Loader({
            'apiKey': this.API_KEY,
            'version': 'weekly',
            'libraries': ['geometry', 'places']
        });
        this.newLocationForm = this._formBuilder.group({
            name: ['', forms_1.Validators.required],
            business_name: ['', forms_1.Validators.required],
            phone_number: ['', forms_1.Validators.required],
            business_email: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            address: this._formBuilder.group({
                address_line_1: ['', forms_1.Validators.required],
                address_line_2: ['', forms_1.Validators.required],
                locality: ['', forms_1.Validators.required],
                administrative_district_level_1: ['', forms_1.Validators.required],
                postal_code: ['', forms_1.Validators.required]
            }),
            twitter_username: ['', forms_1.Validators.required],
            instagram_username: ['', forms_1.Validators.required],
            facebook_url: ['', forms_1.Validators.required],
            website_url: ['', forms_1.Validators.required],
            type: ['', forms_1.Validators.required],
            business_hours: this._formBuilder.group({
                day_of_week: ['', forms_1.Validators.required],
                start_local_time: ['', forms_1.Validators.required],
                end_local_time: ['', forms_1.Validators.required]
            }),
            coordinates: this._formBuilder.group({
                latitude: ['', forms_1.Validators.required],
                longitude: ['', forms_1.Validators.required]
            })
        });
    }
    NewLocationComponent.prototype.onSubmit = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        this.scheduleCount.pop();
        this.addSchedule();
        var formValues = this.newLocationForm.value;
        var per = formValues.business_hours;
        var dataSet = {
            'location': {
                name: formValues.name,
                description: formValues.description,
                business_name: formValues.business_name,
                business_email: formValues.business_email,
                phone_number: formValues.phone_number,
                address: {
                    address_line_1: (_a = formValues.address) === null || _a === void 0 ? void 0 : _a.address_line_1,
                    address_line_2: (_b = formValues.address) === null || _b === void 0 ? void 0 : _b.address_line_2,
                    locality: (_c = formValues.address) === null || _c === void 0 ? void 0 : _c.locality,
                    administrative_district_level_1: (_d = formValues.address) === null || _d === void 0 ? void 0 : _d.administrative_district_level_1,
                    postal_code: (_e = formValues.address) === null || _e === void 0 ? void 0 : _e.postal_code
                },
                twitter_username: formValues.twitter_username,
                instagram_username: formValues.instagram_username,
                facebook_url: formValues.facebook_url,
                website_url: formValues.website_url,
                type: formValues.type,
                business_hours: {
                    periods: this.schedule
                },
                coordinates: {
                    latitude: (_f = formValues.coordinates) === null || _f === void 0 ? void 0 : _f.latitude,
                    longitude: (_g = formValues.coordinates) === null || _g === void 0 ? void 0 : _g.longitude
                }
            }
        };
        this._squareService.addNewLocation(dataSet).subscribe(function (result) {
            _this._snackBar.open('Location Created Successfully', 'Close');
            setTimeout(function () {
                _this._authService.pangeaAuditLog({
                    message: localstorage_slim_1["default"].get('customer_email_address', { decrypt: true }) + " Added New Location."
                }).subscribe(function (result) {
                    _this._snackBar.open("" + result.summary, 'Close');
                });
            });
            setTimeout(function () {
                _this.resetForm();
            }, 1000);
        });
    };
    NewLocationComponent.prototype.addSchedule = function () {
        var _a, _b, _c;
        this.scheduleCount.push('newSchedule');
        var formValues = this.newLocationForm.value;
        var periods = {
            day_of_week: (_a = formValues.business_hours) === null || _a === void 0 ? void 0 : _a.day_of_week,
            start_local_time: (_b = formValues.business_hours) === null || _b === void 0 ? void 0 : _b.start_local_time,
            end_local_time: (_c = formValues.business_hours) === null || _c === void 0 ? void 0 : _c.end_local_time
        };
        this.schedule.push(periods);
    };
    NewLocationComponent.prototype.resetForm = function () {
        this.newLocationForm.reset();
        window.location.reload();
    };
    NewLocationComponent.prototype.getCoordinates = function () {
        this.visibility = 'inherit';
        this.initMap();
    };
    NewLocationComponent.prototype.initMap = function () {
        var _this = this;
        this.loader.load()
            .then(function () {
            var latLng = new google.maps.LatLng(-1.2920659, 36.821946199);
            var map = new google.maps.Map(document.getElementById('map'), {
                mapId: '98d1420b851b24cd',
                zoom: 8,
                center: latLng,
                mapTypeId: 'roadmap'
            });
            var svgMarker = {
                path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: "#9500c2",
                strokeColor: "#f0f7ff",
                fillOpacity: 0.9,
                rotation: 2.5,
                scale: 2.5,
                strokeWidth: 0.5,
                anchor: new google.maps.Point(15, 30)
            };
            map.setCenter({ lat: -1.2920659, lng: 36.821946199 });
            map.addListener('click', function (mapsMouseEvent) {
                map.setCenter(mapsMouseEvent.latLng);
                _this.latitude = mapsMouseEvent.latLng.lat();
                _this.longitude = mapsMouseEvent.latLng.lng();
                new google.maps.Marker({
                    position: mapsMouseEvent.latLng,
                    map: map,
                    icon: svgMarker,
                    animation: google.maps.Animation.DROP
                });
            });
        });
    };
    NewLocationComponent.prototype.btnClose = function () {
        this.visibility = 'hidden';
    };
    NewLocationComponent = __decorate([
        core_1.Component({
            selector: 'app-new-location',
            templateUrl: './new-location.component.html',
            styleUrls: ['./new-location.component.scss']
        })
    ], NewLocationComponent);
    return NewLocationComponent;
}());
exports.NewLocationComponent = NewLocationComponent;
