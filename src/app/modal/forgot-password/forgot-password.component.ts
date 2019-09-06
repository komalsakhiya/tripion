import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NavParams,ModalController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotepasswordForm: FormGroup;
  submitted = false;
  isDisable = false;
  constructor(public _userService: UserService,
    public _toastService: ToastService,public router: Router,public modalController: ModalController) { 

    this.forgotepasswordForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email])
    })

  }

  ngOnInit() {}
  dismissModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

   /**
   * Send Email Forgot Password
   * @param {object} data
   */
  forgotPassword(data) {
    console.log("data==============>", data);
    this.submitted= true;
    // stop here if form is invalid
    if (this.forgotepasswordForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._userService.forgotPasswordEmail(data.value).subscribe((res: any) => {
      console.log('response of password===============>', res);
      this._toastService.presentToast(res.message);
      this.isDisable = false;
      this.modalController.dismiss({
        'dismissed': true
      });
    }, err => {
      console.log('err in password===============>', err);
      this._toastService.presentToast(err.error.message);
      this.isDisable = false;
    })
  }
}
