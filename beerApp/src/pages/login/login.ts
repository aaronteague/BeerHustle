import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';

import { DataService } from '../../providers/data-service';
import { SignUpPage } from '../sign-up-page/sign-up-page';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController, public viewCtrl: ViewController, public dataService: DataService, public navCtrl: NavController, public navParams: NavParams) 
  { 
    let error = navParams.get('error');
    if(error)
      this.displayError(error);
  }

  ionViewDidLoad() {

  }

  login(){
    this.dataService.loginEmail(this.email, this.password).catch(e => this.displayError(e.message));
  }

  forgotPassword(){
    let modal = this.modalCtrl.create(ForgotPasswordPage, {
      dataService: this.dataService
    });
    modal.present();
  }

  signUp(){
    let modal = this.modalCtrl.create(SignUpPage, {dataService: this.dataService});
    modal.present();

  }

  loginGoogle(){
    this.dataService.loginGoogle().catch(e => this.displayError(e.message));
  }

  displayError(error: string) {
    let toast = this.toastCtrl.create( {
      message: error,
      duration: 3000
    });
    toast.present();
  }


}
