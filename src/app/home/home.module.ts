import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePage } from './home.page';
import { ProfilePage } from '../profile/profile.page';
import { AboutPage } from '../about/about.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: '',
            redirectTo:'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            component: ProfilePage
          },
          {
            path: 'about',
            component: AboutPage
          },
        ]
      }
    ])
  ],
  declarations: [HomePage, ProfilePage, AboutPage],
})
export class HomePageModule { }
