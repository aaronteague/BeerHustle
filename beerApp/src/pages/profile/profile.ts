import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';

import {FirebaseObjectObservable} from 'angularfire2';


import { EditProfilePagePage } from '../edit-profile-page/edit-profile-page';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  auth: any = null;
  userInfo: any;
  
  
  //result: string;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) 
  {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.dataService.getAuthState().subscribe(auth =>
    {
     
      this.auth = auth;

       if(!auth){
         this.userInfo = null;
        return;
       }
      this.dataService.getUserData().subscribe(snapshot => {this.userInfo = snapshot; console.log(snapshot.result)}, e => {console.log(e); this.userInfo = null});
    }, e => {});
  }

  logOut(){
    this.userInfo = null;
    this.auth = null;
    this.dataService.logout();

  }

  editProfile(){
     let modal = this.modalCtrl.create(EditProfilePagePage, {userInfo : this.userInfo});
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
