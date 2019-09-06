import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';
import { AuthGuard, LoginGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'forgot-password/:token',
    component:ForgotPswComponent
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  // { path: 'menu', canActivate: [AuthGuard], loadChildren: './menu/menu.module#MenuPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
