import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Purchase page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {

  product: any;
  quantity: number;
  price: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.product = navParams.get('product');
    this.quantity = navParams.get('quantity');

    this.price = this.product.price * this.quantity;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PurchasePage');
  }

  cancel(){
    this.navCtrl.pop();
  }

}