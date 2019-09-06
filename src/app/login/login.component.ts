import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordComponent } from '../modal/forgot-password/forgot-password.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isDisable = false;
  passwordType: string = 'password';
  passwordIcon: string = 'ios-eye-off';
  data;
  inputtext ;
  

  constructor(public router: Router, public _userService: UserService,
    public _toastService: ToastService, private fb: Facebook,private storage: Storage,
    private googlePlus: GooglePlus, public modalController: ModalController) {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    if (this._userService.currentUserValue) {
      this.router.navigate(['home']);
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordComponent
    });
    return await modal.present();
  }

  ngOnInit() {
    
   }

  /**
   * Hide and show password
   */
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off';
  }
  

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
      this.router.navigate(['home']);
    }, err => {
      console.log('err in login ============>', err);
      this._toastService.presentToast(err.error.message);
      this.isDisable = false;
    })
  }

  /**
   * Facebook login
   */
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
          this.router.navigate(['home']);
        }, err => {
          console.log('err===========>', err)
        })
      })
  }

  /**
   * Google Login
   */
  doGoogleLogin() {
    console.log("in google login============")
    this.googlePlus.login({})
      .then((res) => {
        console.log('res==of google==============>', res);
        this._userService.googleLogin(res.accessToken).subscribe((res: any) => {
          console.log('response of google login============>', res);
          this._toastService.presentToast(res.message);
          this.router.navigate(['home']);
        }, err => {
          console.log('err==========>', err)
        })
      })
      .catch(err => console.error('err==============>', err));
  }

  
}
