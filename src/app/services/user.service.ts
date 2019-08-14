import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import * as CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  key = "tripion@raoinfor";
  constructor(private http: HttpClient, private storage: Storage) { }

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
          this.storage.set('accessToken', user.token);
          this.storage.get('accessToken').then((val) => {
            console.log('accessToken', val);
          });
          // this.currentUserSubject.next(user);
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
          this.storage.set('accessToken', user.data.accessToken);
          this.storage.get('accessToken').then((val) => {
            console.log('accessToken', val);
          });
          // this.currentUserSubject.next(user);
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
          // this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
}
