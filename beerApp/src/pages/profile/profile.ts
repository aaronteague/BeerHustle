import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {trigger,state,style,animate,transition} from '@angular/animations';

import { DataService } from '../../providers/data-service';



import { EditProfilePagePage } from '../edit-profile-page/edit-profile-page';

const WHITE = { low: 0, high: 4900, display: "White" };
const BLUE = { low: 5000, high: 19900, display: "Blue" };
const BRONZE = {low: 20000, high: 49900, display: "Bronze" };
const SILVER = { low: 50000, high: 149900, display: "Silver" };
const GOLD = { low: 150000, high: 499900, display: "Gold" };
const PLATINUM = { low: 500000, high: 50000000000000000000, display: "Platinum" };

const RANKINGS_LIST: any[] = [WHITE, BLUE, BRONZE, SILVER, GOLD, PLATINUM];

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  animations: [
     trigger('display', [
      state('start', style({opacity: 0, transform: 'translateY(-50%)'})),
      state('finish', style({opacity: 1, transform: 'translateY(-300%)' })),
      transition('start => finish', animate('1.0s ease-out'))
     ]),
     trigger('growBar',[
       state('static', style({})),
       state('animate', style({})),
       transition('static => animate', animate('1.0 ease-out'))
     ])
   ]
})
export class ProfilePage {
  
  pointAddIndicator: string = "";
  pointAddIndicatorStatus: string = 'start';

  userProfile: any = null;
  userExtraData: any = null;
  currentRank: any = {display: "invalid"};
  progressPercent: number = 35;
  progressPercentString: string = '35%';
  


  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) 
  {
    this.progressPercentString = this.progressPercent.toString() + '%';
  }

  ionViewDidLoad() {
    // this is the test for the bar
    
    this.addScoreRecursive(80);

      // setTimeout(()=>{
      //  this.progressPercent = '80%';
      // }, 1000);

    // end test
    
    this.userProfile = this.dataService.getUser();
    
    this.dataService.getUserAdditionalData((data) => {this.userExtraData = data; this.getLevel();});
    this.consumePoints();
  }

  addScoreRecursive(goal: number){
    console.log("calling addScoreRecursive");
      if(this.progressPercent <= goal){
        this.progressPercent++;
        this.progressPercentString = this.progressPercent.toString() + '%';
        setTimeout(() => {
          this.addScoreRecursive(goal);
        }, 15);
      }
    }

  consumePoints(){
    this.dataService.getCompletedOrders((data) => {
      this.dataService.addPointsToUser(Math.ceil(data.total * 100), data);
      this.displayPointAdditions(Math.ceil(data.total * 100));
    });
  }

  testFunc(){
    
  }

  animateProgressBar(beforeScore: number, afterScore: number){

  }

  getProgressPercent(): string{
    return '40%';
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
  //  console.log(points);
    
  //   if(points >= WHITE.low && points <= WHITE.high)
  //     this.currentColor = "White";   
  //   else if(points >= BLUE.low && points <= BLUE.high)
  //     this.currentColor =  "Blue";
  //   else if(points >= BRONZE.low && points <= BRONZE.high)
  //     this.currentColor =  "Bronze";
  //   else if(points >= SILVER.low && points <= SILVER.high)
  //     this.currentColor =  "Silver";
  //   else if(points >= GOLD.low && points <= GOLD.high)
  //     this.currentColor =  "Gold";
  //   else if(points >= PLATINUM.low)
  //     this.currentColor =  "Platinum";
  //   else
  //     this.currentColor =  "Invalid";
      

    for(let rank of RANKINGS_LIST){
      if(points >= rank.low && points <= rank.high){
        this.currentRank = rank;
        break;
      }
    }
      
  }

}
