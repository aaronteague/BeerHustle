import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { DataService } from '../../providers/data-service'

/*
  Generated class for the SignUpPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up-page',
  templateUrl: 'sign-up-page.html'
})
export class SignUpPage {
  email: string = "";
  password: string = "";
  passwordRetyped: string = "";
  firstName: string = "";
  lastName: string = "";
  dataService: DataService;

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.dataService = navParams.get('dataService');
  }

  ionViewDidLoad() {
  }

  Cancel() {
    this.navCtrl.pop();
  }

  CreateAccount(){
    if(this.firstName.length == 0)
      this.displayError("We need a valid first name");
    else if(this.lastName.length == 0)
      this.displayError("We need a valid last name");
    else if(this.email.length == 0)
      this.displayError("We need a valid email");
    else if(this.password.length == 0)
      this.displayError("First password field is blank");
    else if(this.passwordRetyped.length == 0)
      this.displayError("Second password field is blank");
    else if(this.password !== this.passwordRetyped)
      this.displayError("Passwords do not match" + this.password + this.passwordRetyped);
    else if(this.password.length < 6 || this.passwordRetyped.length < 6)
      this.displayError("Password must be atleast 6 characters");
    else{
      this.dataService.signUp(this.email, this.password, this.firstName, this.lastName).then(user => {
   
        this.navCtrl.pop();
        this.displaySuccess();
      
      }).catch(e => {
        this.displayError(e.message);
      });
      //this.viewCtrl.dismiss({'email': this.email, 'password': this.password, 'firstName': this.firstName, 'lastName': this.lastName});
      
    }


  }

  displayError(error: string){
    //console.log(error);
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000
    });
    toast.present();
  }

  displaySuccess(){
    console.log("success");
    let popup = this.alertCtrl.create({
      title: "Success!",
      subTitle: "Welcome to Beer Hustle!  Please enjoy your stay!",
      buttons: ['OK']
    });
    //popup.onDidDismiss(() => this.navCtrl.pop());
    popup.present();
  }

}
