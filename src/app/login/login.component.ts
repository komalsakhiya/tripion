import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isDisable = false
  constructor(public _userService: UserService, public _toastService: ToastService, private fb: Facebook, ) {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }
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
      .then((response:FacebookLoginResponse )=> {
        console.log('response=============>',response)
        let userId = response.authResponse.userID;
        //Getting name and gender properties
        this.fb.api("/me?fields=name,email", permissions)
          .then(user => {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            console.log('res===========of fb=======>',user)
            //now we have the users info, let's save it in the NativeStorage
          }, error => {
            console.log('error============>',error);
          });
      })
  }

}
