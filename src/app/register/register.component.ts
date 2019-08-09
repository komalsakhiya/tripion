import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import {ToastService} from '../services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isDisable = false;
  constructor(public router:Router,public _userService:UserService,public _toastServices:ToastService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });
  }

  ngOnInit() { }


  // validateMobile(form) {
  //   console.log(form);
  //   const phoneregx = /[0-9]{10}/;
  //   const message = document.getElementById('message');
  //   if (!form.contact.match(phoneregx)) {
  //     console.log("message==========", message)
  //     message.innerHTML = "Mobile Number Cannot contain character"
  //   } else {
  //     message.innerHTML = "";
  //   }
  // }


  rgisterUser(data) {
    console.log('register data==========', data.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.isDisable = true
    this._userService.registerUser(data.value).subscribe((res:any)=>{
      console.log("register user data response==================?",res);
      this._toastServices.presentToast(res.message);
      this.router.navigateByUrl('/login');
      this.isDisable = false;
    },err=>{
      console.log("err in register data===============>",err);
      this._toastServices.presentToast(err.error.message);
      this.isDisable = false;
    })
  }

}
