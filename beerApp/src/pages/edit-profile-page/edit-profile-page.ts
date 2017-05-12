import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';


@Component({
  selector: 'page-edit-profile-page',
  templateUrl: 'edit-profile-page.html'
})
export class EditProfilePagePage {
  userInfo: any;
  firstName: string;
  lastName: string;
  photoBlob: any;


  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private platform: Platform) {
    this.userInfo = navParams.get('userInfo');

    this.firstName = this.userInfo.FirstName;
    this.lastName = this.userInfo.LastName;
  }

  ionViewDidLoad() {

  }

  save() {
    this.userInfo.FirstName = this.firstName;
    this.userInfo.LastName = this.lastName;
    this.userInfo.photoBlob = this.photoBlob;
    this.viewCtrl.dismiss(this.userInfo);
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

  // this function will require some testing once we get a device implemented
  getPic() {
    if(!this.platform.is('cordova'))
      return;
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((uri) => {
      fetch(uri).then(blob => this.photoBlob = blob);
      
    }).catch(e => console.log(e));
  }

}
