import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import {trigger,state,style,animate,transition} from '@angular/animations';


import { PurchasePage } from '../../pages/purchase/purchase';

/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  animations: [
    trigger('makeBlur', [
      state('clear', style({filter: 'blur(0px)'})),
      state('blur', style({filter: 'blur(10px)'})),
      transition('clear => blur', animate('.5s ease-in'))
    ])
  ]
})
export class ProductPage {

  product: any;
  purchaseMultiplier: number = 1;
  blur: string = 'clear';

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) 
  {
        this.product = this.navParams.get('product');

  }

  ionViewDidLoad() { }

  addOneQuantity() {
    if(this.purchaseMultiplier < 7)
      this.purchaseMultiplier++;
  }

  subtractOneQuantity() {
    if(this.purchaseMultiplier > 1)
      this.purchaseMultiplier--;
  }

  orderItem() {
    let modal = this.modalCtrl.create(PurchasePage);
    modal.onDidDismiss(() => this.blur = 'clear');

    this.blur = 'blur';
    modal.present();
  }

}
