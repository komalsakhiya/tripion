import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  accessToken;
  resetpswForm: FormGroup;
  submitted = false;
  isDisable = false;

  constructor(public modalController: ModalController,public _userService:UserService,public _toastService:ToastService) {
    this.resetpswForm = new FormGroup({
      emailId: new FormControl('', Validators.required),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });

  }

  ngOnInit() { }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  /**
  * Reset Password 
  * @param {object} data 
  */
  resetPassword(data) {
    this.submitted = true;
    if (this.resetpswForm.invalid) {
      return;
    }
    this.isDisable = true;
    console.log('data===================>', data);
    this._userService.resetPassword(data.value).subscribe((res: any) => {
      console.log("response in reset pwd============>", res);
      this._toastService.presentToast(res.message)
      this.isDisable = false;
      this.resetpswForm.reset();
    }, err => {
      console.log('err===============>', err);
      this._toastService.presentToast(err.error.message);
      this.isDisable = false;
      this.resetpswForm.reset();
    })
  }

}
