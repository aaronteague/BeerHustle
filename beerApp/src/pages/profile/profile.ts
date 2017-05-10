import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {trigger,state,style,animate,transition} from '@angular/animations';

import { DataService } from '../../providers/data-service';



import { EditProfilePagePage } from '../edit-profile-page/edit-profile-page';

const WHITE = { low: 0, high: 4900 };
const BLUE = { low: 5000, high: 19900 };
const BRONZE = {low: 20000, high: 49900 };
const SILVER = { low: 50000, high: 149900 };
const GOLD = { low: 150000, high: 499900 };
const PLATINUM = { low: 500000, high: -1 };

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  animations: [
     trigger('display', [
      state('start', style({opacity: 0, transform: 'translateY(-50%)'})),
      state('finish', style({opacity: 1, transform: 'translateY(-300%)' })),
      transition('start => finish', animate('1.0s ease-out'))
     ]),
   ]
})
export class ProfilePage {
  
  pointAddIndicator: string = "";
  pointAddIndicatorStatus: string = 'start';

  //auth: any = null;
  userProfile: any = null;
  userExtraData: any = null;
  currentColor: string = "invalid";
  //pointsNumber: number = 0;
  
  
  //result: string;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) 
  {
    
  }

  ionViewDidLoad() {
    this.userProfile = this.dataService.getUser();
    
    //this.dataService.getUserAdditionalData().then(e => {this.userExtraData = e.val(); console.log(this.userExtraData)});
    this.dataService.getUserAdditionalData((data) => {this.userExtraData = data; this.getLevel();});
    this.consumePoints();
  }

  consumePoints(){
    this.dataService.getCompletedOrders((data) => {
      this.dataService.addPointsToUser(Math.ceil(data.total * 100), data);
      this.displayPointAdditions(Math.ceil(data.total * 100));
    });
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

  displayPointAdditions(points: number){
    this.pointAddIndicator = points.toString();
    this.pointAddIndicatorStatus = 'finish';


    setTimeout(() =>{
      this.pointAddIndicator = "";
      this.pointAddIndicatorStatus = 'start';
    }, 1500);
  }

  getLevel(){
    

     let points = this.userExtraData.points;
   console.log(points);
    
    if(points >= WHITE.low && points <= WHITE.high)
      this.currentColor = "White";   
    else if(points >= BLUE.low && points <= BLUE.high)
      this.currentColor =  "Blue";
    else if(points >= BRONZE.low && points <= BRONZE.high)
      this.currentColor =  "Bronze";
    else if(points >= SILVER.low && points <= SILVER.high)
      this.currentColor =  "Silver";
    else if(points >= GOLD.low && points <= GOLD.high)
      this.currentColor =  "Gold";
    else if(points >= PLATINUM.low)
      this.currentColor =  "Platinum";
    else
      this.currentColor =  "Invalid";
      
      
  }

}
