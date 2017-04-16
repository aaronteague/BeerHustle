import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
        this.product = this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductPage');

  }

}
