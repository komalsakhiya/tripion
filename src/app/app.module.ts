import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {MyInterceptor} from './interceptor';
import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    { provide:RouteReuseStrategy , useClass: IonicRouteStrategy },
    { provide:HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
