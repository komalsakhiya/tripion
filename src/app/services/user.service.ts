import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  key = "tripion@raoinfor";
  constructor(private http: HttpClient) { }

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

  loginUser(userData) {
    console.log('data=============>', userData)
    return this.http.post(config.baseApiUrl + "api/login", userData);
  }
}
