import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';



import { EditProfilePagePage } from '../edit-profile-page/edit-profile-page';

const WHITE = { low: 0, high: 4900 };
const BLUE = { low: 5000, high: 19900 };
const BRONZE = {low: 20000, high: 49900 };
const SILVER = { low: 50000, high: 149900 };
const GOLD = { low: 150000, high: 499900 };
const PLATINUM = { low: 500000, high: -1 }

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  

  //auth: any = null;
  userProfile: any = null;
  userExtraData: any;
  //pointsNumber: number = 0;
  
  
  //result: string;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) 
  {
    
  }

  ionViewDidLoad() {
    this.userProfile = this.dataService.getUser();
    //console.log(this.userProfile);
    this.dataService.getUserAdditionalData().then(e => {this.userExtraData = e.val(); console.log(this.userExtraData)});
    
  }



  logOut(){
    this.userProfile = null;
    this.userExtraData = null;
    
    this.dataService.logout();

  }

  editProfile(){
     let modal = this.modalCtrl.create(EditProfilePagePage, {userInfo : this.userProfile});
     modal.onDidDismiss(data => {
       if(data)
         this.dataService.saveUserData(data);
     });
     modal.present();
  }

  getLevel(): string{
    

     let points = this.userExtraData;
     console.log(points);
    /*
    if(points >= WHITE.low && points <= WHITE.high)
      return "White";
      
    else if(points >= BLUE.low && points <= BLUE.high)
      return "Blue";
    else if(points >= SILVER.low && points <= SILVER.high)
      return "Silver";
    else if(points >= GOLD.low && points <= GOLD.high)
      return "Gold";
    else if(points >= PLATINUM.low)
      return "Platinum";
    else
      return "Invalid";
      */
      return "herp derp";
  }

}
