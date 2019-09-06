import { Component } from '@angular/core';
import { Platform,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router, Event, NavigationStart,RouterEvent } from '@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentUser: any;
  selectedPath = '';
  pages = [
    {
      title: 'profile',
      url: '/home/profile'
    },
    {
      title: 'About',
      url: '/home/about'
    }
  ];

  constructor(
    public router: Router,
    public _userService: UserService,
    private menu: MenuController
  ) {
    this._userService.currentUser.subscribe(x => this.currentUser = x);
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    }); 
  }

  /**
   * Logout user
   */
  logOut() {
    console.log("log out");
    this._userService.logOut();
    this.router.navigate(['/login']);
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

//   openEnd() {
//     this.menu.open('end');
//   }

//   openCustom() {
//     this.menu.enable(true, 'custom');
//     this.menu.open('custom');
//   }
}
