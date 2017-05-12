import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  email: string;
  dataService: DataService;

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.dataService = navParams.get('dataService');
  }

  ionViewDidLoad() {
  }

  sendReset() {
    this.dataService.sendReset(this.email).then(() => {
      this.displaySuccess();
     }).catch(error => {
       this.displayError(error.message);
     }) ;
  }

  back() {
    this.navCtrl.pop();
  }

  displayError(error: string){
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000
    })
    toast.present();
  }

  displaySuccess() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Please check your email for instructions to reset your password',
      buttons: ['OK']
    });
    alert.onDidDismiss(() => { this.back();});
    alert.present();
  }
}
