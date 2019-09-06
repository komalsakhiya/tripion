import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ResetPasswordComponent} from '../modal/reset-password/reset-password.component';;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordComponent
    });
    return await modal.present();
  }

}
