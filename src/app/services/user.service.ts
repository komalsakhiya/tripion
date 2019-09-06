import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import * as CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  key = "tripion@raoinfor";
  // authenticationState = new BehaviorSubject(false);
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('accessToken'));
    this.currentUser = this.currentUserSubject.asObservable();
    // this.plt.ready().then(() => {
    //   this.checkToken();
    // });
  }

  // checkToken() {
  //   this.storage.get('accessToken').then(res => {
  //     if (res) {
  //       console.log("in checktoken===============?",res)
  //       this.authenticationState.next(true);
  //     }
  //   })
  // }


  // isAuthenticated() {
  //   return this.authenticationState.value;
  // }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Register User
   * @param {Object} userData 
   */
  registerUser(userData) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(userData), this.key).toString();
    console.log("userData================>", encrypted);
    // const decrypted = CryptoJS.AES.decrypt(encrypted, this.key).toString(CryptoJS.enc.Utf8);
    // console.log("decrypted================>", decrypted);
    const json = { encrypted };
    console.log("====>", json)
    console.log(config.baseApiUrl)
    return this.http.post(config.baseApiUrl + "api/signup", json);
  }

  /**
   * Login User
   * @param {Object} userData 
   */
  loginUser(userData) {
    console.log('data=============>', userData)
    return this.http.post(config.baseApiUrl + "api/login", userData).
      pipe(map((user: any) => {
        console.log("login user=========>", user);
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // this.storage.set('accessToken', user.token);
          localStorage.setItem('accessToken', user.token);
          // console.log("login user token", user)
          const accessToken = localStorage.getItem('accessToken');
          console.log("accesstoken========================>>>", accessToken)
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  /**
   * Login With Facebook
   * @param {String} data 
   */
  fbLogin(data) {
    console.log('data============>', data);
    const accessToken = {
      accessToken: data
    }
    return this.http.post(config.baseApiUrl + "api/facebook-login", accessToken).
      pipe(map((user: any) => {
        console.log("login user with fb=========>", user);
        // login successful if there's a jwt token in the response
        if (user && user.data.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('accessToken', user.data.accessToken);
          localStorage.getItem('accessToken');
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  /**
   * Login With Google
   * @param {String} data 
   */
  googleLogin(data) {
    console.log('data============>', data);
    const accessToken = {
      accessToken: data
    }
    return this.http.post(config.baseApiUrl + "api/google-login", accessToken).
      pipe(map((user: any) => {
        console.log("login user with fb=========>", user);
        // login successful if there's a jwt token in the response
        if (user && user.data.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storage.set('accessToken', user.data.accessToken);
          this.storage.get('accessToken').then((val) => {
            console.log('accessToken', val);
          });
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }


  logOut() {
    // this.storage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
  }

   /**
   * forgot Password sen Email
   * @param {object} data
   */
  forgotPasswordEmail(data) {
    console.log("userData================>", data);
    return this.http.post(config.baseApiUrl + "api/forgot-password", data);
  }

  /**
   * Forgot Password
   * @param {object} data
   * @param {String} emailHash
   */
  forgotPassword(data, emailHash) {
    console.log('data==============>', data, emailHash);
    return this.http.post(config.baseApiUrl + "api/email-verify/" + emailHash, data);
  }
/**
 * Reset Password
 * @param {Object} data 
 */
  resetPassword(data) {
    return this.http.post(config.baseApiUrl + "api/updatePassword", data);
  }
}
