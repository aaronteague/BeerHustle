import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';

import { BeerSearchPage } from '../pages/beer-search/beer-search';
import { ProfilePage } from '../pages/profile/profile';

import { DataService } from '../providers/data-service';





@Component({
  templateUrl: 'app.html',
  providers: [DataService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  //authKey: any;

  pages: Array<{title: string, component: any}>;

  constructor(public modalCtrl: ModalController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public dataService: DataService) {  
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Beer List', component: BeerSearchPage},
      { title: 'Profile', component: ProfilePage }
    ];

  }

  initializeApp() {
    // decide first if we need this user to log in, we do this first
    // as the network will be the bottleneck
      this.dataService.monitorAuthStatus(user => {
        if(user)
          this.nav.setRoot(ProfilePage);
        else
          this.nav.setRoot(LoginPage);
      });


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      

        
      
    });
  }

  presentLoginScreen(){
    let loginScreenModal = this.modalCtrl.create(LoginPage);
    loginScreenModal.present();
    //this.nav.push(LoginPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
