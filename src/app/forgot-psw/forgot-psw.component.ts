import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { Router ,ActivatedRoute} from '@angular/router';
// import { NavParams ,NavController} from '@ionic/angular';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.scss'],
})
export class ForgotPswComponent implements OnInit {
  resetpswForm: FormGroup;
  emailHash;
  isDisable = false;
  submitted = false;
  passwordType: string = 'password';
  passwordIcon: string = 'ios-eye-off';
  constructor(public _userService: UserService,private route: ActivatedRoute,
    public _toastService: ToastService, public router: Router) {
    // this.emailHash = this.navParams.get('token');
    this.route.params.subscribe(param => {
      this.emailHash = param.token;
      console.log("emailhash=========>",this.emailHash)
    });
    this.resetpswForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'ios-eye-off' ? 'ios-eye' : 'ios-eye-off';
  }
  /**
    * Forgot Password
    * @param {Object} data 
    */
  forgotPassword(data) {
    console.log("emailHash=============", this.emailHash)
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetpswForm.invalid) {
      return;
    }
    this.isDisable = true
    console.log('data================>', data);
    this._userService.forgotPassword(data.value, this.emailHash).subscribe((res: any) => {
      console.log('response of resetpsw============>', res);
      this._toastService.presentToast(res.message)
      this.isDisable = false
      this.router.navigate(["/login"]);
    }, err => {
      console.log('err================>', err);
      this._toastService.presentToast(err.error.message)
      this.isDisable = false
    })
  }
}
