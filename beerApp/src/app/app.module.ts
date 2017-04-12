import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

//import { EditProfilePagePage } from '../pages/edit-profile-page/edit-profile-page';
import { EditProfilePagePage } from '../pages/edit-profile-page/edit-profile-page';
import { SignUpPage } from '../pages/sign-up-page/sign-up-page';

import { LoginPage } from '../pages/login/login';
import { BeerSearchPage } from '../pages/beer-search/beer-search';
import { ProfilePage } from '../pages/profile/profile';





import { DataService } from '../providers/data-service';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// import { AngularFireModule} from 'angularfire2';


@NgModule({
  declarations: [
    LoginPage,
    Page1,
    Page2,
    MyApp,
    EditProfilePagePage,
    BeerSearchPage,
    ProfilePage,
    SignUpPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    Page1,
    Page2,
    MyApp,
    EditProfilePagePage,
    BeerSearchPage,
    ProfilePage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {}
