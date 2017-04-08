import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

var authKey: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public viewCtrl: ViewController, public dataService: DataService, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //this.af.auth.login({email: 'aaron.teague@outlook.com', password: 'butterscotch'});
    
  }

  login(){
    this.dataService.loginEmail('aaron.teague@outlook.com', 'butterscotch').then(auth => 
    {
      if(auth){
        this.viewCtrl.dismiss();
      }
        // this.navCtrl.pop();
    }).catch(e => console.log(e));
  }

  signUp(){
    this.dataService.signUp('aaron.teague@outlook.com', 'butterscotch')
    .then(auth => {
      if(auth)
        this.navCtrl.pop();
      
    })
    .catch(e => {
      console.log(e);
    });
  }


}
