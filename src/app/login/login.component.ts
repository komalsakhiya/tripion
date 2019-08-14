import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isDisable = false
  constructor(public router:Router,public _userService: UserService, public _toastService: ToastService, private fb: Facebook, private googlePlus: GooglePlus) {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }

  /**
   * Login User
   * @param {Object}  data 
   */
  loginUser(data) {
    console.log('data============>', data);
    if (this.loginForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._userService.loginUser(data).subscribe((res: any) => {
      console.log('res of login============>', res);
      this._toastService.presentToast(res.message);
      this.isDisable = false;
      this.router.navigateByUrl('/home');
    }, err => {
      console.log('err in login ============>', err);
      this._toastService.presentToast(err.error.message);
      this.isDisable = false;
    })
  }

  async doFbLogin() {
    console.log("in facebook login============")
    let permissions = new Array<string>();
    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];
    this.fb.login(permissions)
      .then((response: FacebookLoginResponse) => {
        console.log('response=============>', response)
        let accessToken = response.authResponse.accessToken;
        console.log('accessToken=============,accessToken', accessToken)
        this._userService.fbLogin(accessToken).subscribe((res: any) => {
          console.log('response of server for fb login=============>', res)
          this._toastService.presentToast(res.message);
        }, err => {
          console.log('err===========>', err)
        })
      })
  }

  doGoogleLogin() {
    console.log("in google login============")
    this.googlePlus.login({})
      .then((res) => {
        console.log('res==of google==============>', res);
        this._userService.googleLogin(res.accessToken).subscribe((res: any) => {
          console.log('response of google login============>', res);
          this._toastService.presentToast(res.message);
        }, err => {
          console.log('err==========>', err)
        })
      })
      .catch(err => console.error('err==============>', err));
  }

}
