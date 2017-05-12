import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EditProfilePagePage } from '../pages/edit-profile-page/edit-profile-page';
import { SignUpPage } from '../pages/sign-up-page/sign-up-page';

import { LoginPage } from '../pages/login/login';
import { BeerSearchPage } from '../pages/beer-search/beer-search';
import { ProfilePage } from '../pages/profile/profile';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ProductPage } from '../pages/product/product';
import {PurchasePage} from '../pages/purchase/purchase';
 
import { ImagePicker } from '@ionic-native/image-picker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { DataService } from '../providers/data-service';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';





@NgModule({
  declarations: [
    LoginPage,
    MyApp,
    EditProfilePagePage,
    BeerSearchPage,
    ProfilePage,
    SignUpPage,
    ForgotPasswordPage,
    ProductPage,
    PurchasePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    MyApp,
    EditProfilePagePage,
    BeerSearchPage,
    ProfilePage,
    SignUpPage,
    ForgotPasswordPage,
    ProductPage,
    PurchasePage
  ],
  providers: [
    StatusBar,
    ImagePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
    
  ]
})
export class AppModule {}
