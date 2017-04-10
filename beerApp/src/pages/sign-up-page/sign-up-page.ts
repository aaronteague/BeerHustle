import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }

  CreateAccount(){
    if(this.firstName.length == 0)
      this.displayError("We need a valid first name");
    else if(this.lastName.length == 0)
      this.displayError("We need a valid last name");
    if(this.email.length == 0)
      this.displayError("We need a valid email");
    else if(this.password.length == 0)
      this.displayError("First password field is blank");
    else if(this.passwordRetyped.length == 0)
      this.displayError("Second password field is blank");
    else if(this.password !== this.passwordRetyped)
      this.displayError("Passwords do not match" + this.password + this.passwordRetyped);
    else if(this.password.length < 6 || this.passwordRetyped.length < 6)
      this.displayError("Password must be atleast 6 characters");
    else
      this.viewCtrl.dismiss({'email': this.email, 'password': this.password, 'firstName': this.firstName, 'lastName': this.lastName});
  }

  displayError(error: string){
    console.log(error);
  }

}
