import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';



import { EditProfilePagePage } from '../edit-profile-page/edit-profile-page';



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
    this.dataService.getUserAdditionalData().then(e => this.userExtraData = e.val());
    
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
         this.dataService.saveUserData(data).catch(e => console.log(e));
     });
     modal.present();
  }

  getLevel(): string{
    return "blue";
  }

}
