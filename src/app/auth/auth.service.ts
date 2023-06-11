import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, of } from 'rxjs';
import CryptoJS from 'crypto-js';

import { User, UserCredentials } from '../interfaces/user';

import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';
import ls from 'localstorage-slim';

import { AdminUser } from 'src/app/interfaces/user';

import { initializeApp } from 'firebase/app';

import {
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  initializeFirestore,
  serverTimestamp,
} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseConfig = {
    apiKey: "***************************************",
    authDomain: "healus-assurance.firebaseapp.com",
    projectId: "healus-assurance",
    storageBucket: "healus-assurance.appspot.com",
    messagingSenderId: "*********************",
    appId: "*******************************",
    measurementId: "*********************"
  };

  app = initializeApp(this.firebaseConfig);

  db = initializeFirestore(this.app,
    {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    },
  );

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _appService: AppService,
  ) { }

  newSquareCustomer(user: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/newSquareCustomer`, user, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  pangeaAuthFlowStart(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/startPangeaAuthFlowStart`, {
      email: data.email,
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError))

  }

  pangeaCompleteUserSignUp(data: any) {
    const enc_key: string = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const user_password: string = `${data.password}`;

    const dataSet = {
      flow_id: data.flow_id,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password
    };
  }


  newPangeaUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/newPangeaUser`, {
      email: data.email,
      password: data.password
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  pangeaUpdateUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaUpdateUser`, {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  pangeaVerifyUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaVerifyUser`, {
      email: data.email,
      password: data.password
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));

  }


  pangeaVerifyPassword(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaVerifyPassword`, {
      flow_id: data.flow_id,
      password: data.password
    },
      this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  pangeaVerifyEmail(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaVerifyEmail`, {
      flow_id: data.flow_id,
      email: data.email
    }, this._appService.httpOptions)
  }

  pangeaStartMFAEnrollment(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaStartMFAEnrollment`, {
      flow_id: data.flow_id,
    },
      this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  pangeaCompleteMFAEnrollment(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaCompleteMFAEnrollment`, {
      flow_id: data.flow_id,
      otp_code: data.otp_code
    }, this._appService.httpOptions);
  }

  pangeaVerifyMFAComplete(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaVerifyMFAComplete`, {
      flow_id: data.flow_id,
      otp_code: data.otp_code
    }, this._appService.httpOptions);
  }

  pangeaGetFlowState(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaGetFlowState`, {
      flow_id: data.flow_id,
    }, this._appService.httpOptions);
  }

  pangeaStartMFAVerification(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaStartMFAVerification`, {
      flow_id: data.flow_id,
    }, this._appService.httpOptions);
  }

  pangeaFlowComplete(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaFlowComplete`, {
      flow_id: data.flow_id,
    }, this._appService.httpOptions);
  }

  pangeaLoginWithPassword(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaLoginWithPassword`, {
      data,
    }, this._appService.httpOptions);
  }

  pangeaPasswordReset(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaPasswordReset`, {
      data,
    }, this._appService.httpOptions);
  }

  pangeaAuditLog(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaAuditLog`, {
      data,
    }, this._appService.httpOptions);
  }

  pangeaCheckEmailBreach(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaCheckEmailBreach`, {
      data,
    }, this._appService.httpOptions);
  }

  pangeaLogoutUser(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaLogoutUser`, {
      data,
    }, this._appService.httpOptions);
  }

  pangeaUpdateUserPassword(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/pangeaUpdateUserPassword`, {
      data,
    }, this._appService.httpOptions);
  }


  async saveAdminUser(userData: AdminUser) {
    const enc_key: string = CryptoJS.enc.Base64.parse(`${userData.email_address}`).toString();
    const user_password: string = `${userData.password}`;

    const adminUser = {
      id: self.crypto.randomUUID().toString().toUpperCase(),
      given_name: userData.given_name,
      family_name: userData.family_name,
      phone_number: userData.phone_number,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      email_address: userData.email_address,
      password: CryptoJS.AES.encrypt(user_password, enc_key).toString(),
      isActive: false,
      isAuthorizedAdmin: false,
    };

    try {
      const docRef = doc(this.db, 'AdminUser', `${userData.email_address}`);
      await setDoc(docRef, adminUser, { merge: true });

    } catch (err: any) {
      console.log('Error Writting document', err);
    }

  }


  getLocationId(): Observable<any> {
    return this._httpClient.get(`${this._appService.FirebaseFunctionsEndpoint}/getSquareMainLocation`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getuserByEmailAddress(email: string): Observable<any> {

    const qs = {
      "limit": 1,
      "query": {
        "filter": {
          "email_address": {
            "exact": email
          }
        }
      }
    };

    return this._httpClient.post(`${this._appService.FirebaseFunctionsEndpoint}/getSquareCustomerByEmail`, qs, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  async loginUser(data: UserCredentials) {
    const enc_key = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const docRef = doc(this.db, 'UserCredentials', `${data.email_address}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const pass: string = docData['password'];


      if (data.password == CryptoJS.AES.decrypt(docData['password'], CryptoJS.enc.Base64.parse(`${data.email_address}`).toString()).toString(CryptoJS.enc.Utf8)) {
        setTimeout(async () => {
          await updateDoc(docRef, { isActive: true });

          this.getuserByEmailAddress(`${data.email_address}`).subscribe((result: any) => {
            ls.set('auth_login_status', docData['isActive'], { encrypt: true });
            ls.set('customer_id', result.customers[0].id, { encrypt: true });
            ls.set('customer_email_address', result.customers[0].email_address, { encrypt: true });

          });

        });

        setTimeout(() => {
          this._router.navigate(['/selfcare']);
        }, 1000);

        return 'Subscribe to your preffered package.'

      } else {
        return "Wrong Credentials, Passwords didn't match.";

      }

    } else {
      return 'No user exists, with those Credentials.';

    }
  }

  async loginAdmin(data: UserCredentials) {
    const enc_key = CryptoJS.enc.Base64.parse(`${data.email_address}`).toString();
    const docRef = doc(this.db, 'AdminUser', `${data.email_address}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const pass: string = docData['password'];

      if (data.password == CryptoJS.AES.decrypt(docData['password'], CryptoJS.enc.Base64.parse(`${data.email_address}`).toString()).toString(CryptoJS.enc.Utf8)) {
        await updateDoc(docRef, { isActive: true });

        ls.set('canLoginAsAdmin', docData['isAuthorizedAdmin'], { encrypt: true });

        setTimeout(() => {
          this._router.navigate(['/admin']);
        });

        return 'Now Logged In As Admin'

      } else {
        return "Wrong Credentials, Passwords didn't match.";

      }

    } else {
      return 'No user exists, with those Credentials.';

    }
  }

  isAdminLoggedIn(): boolean {
    const status =  Boolean(ls.get('canLoginAsAdmin', { decrypt: true }));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/admin/auth/signin']);
      });

      return false;
    }
  }

  isUserLoggedIn(): boolean {
    const status = Boolean(ls.get('auth_login_status', { decrypt: true }));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/selfcare/auth/signin']);
      });

      return false;
    }
  }
}
