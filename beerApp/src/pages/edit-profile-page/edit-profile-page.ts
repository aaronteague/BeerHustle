import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-edit-profile-page',
  templateUrl: 'edit-profile-page.html'
})
export class EditProfilePagePage {
  userInfo: any;
  firstName: string;
  lastName: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = navParams.get('userInfo');
    this.firstName = this.userInfo.FirstName;
    this.lastName = this.userInfo.LastName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePagePage');
  }

  save() {
    this.userInfo.FirstName = this.firstName;
    this.userInfo.LastName = this.lastName;
    this.viewCtrl.dismiss(this.userInfo);
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

}
