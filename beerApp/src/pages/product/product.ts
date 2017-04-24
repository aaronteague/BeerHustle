import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

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
  toggleMessage: string = 'Read More';
  currentDescriptionText: string;
  shortSize = 300;


  constructor(public dataService: DataService, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) 
  {
        this.product = this.navParams.get('product');

        if(this.product.description.length > this.shortSize)
          this.currentDescriptionText = this.product.description.substring(0, this.shortSize);
        else
          this.currentDescriptionText = this.product.description;

        console.log(this.currentDescriptionText);
  }

  ionViewDidLoad() 
  {
    // the following is test code while I'm working on the purchase screen
    // TEST CODE , TEST TEST TEST
    
  }

  addOneQuantity() {
    if(this.purchaseMultiplier < 7)
      this.purchaseMultiplier++;
  }

  subtractOneQuantity() {
    if(this.purchaseMultiplier > 1)
      this.purchaseMultiplier--;

    this.navCtrl.pop();
  }

  orderItem() {
    let modal = this.modalCtrl.create(PurchasePage, {
      'dataService': this.dataService,
      'product': this.product,
      'quantity': this.purchaseMultiplier
    });
    modal.onDidDismiss(() => this.blur = 'clear');

    this.blur = 'blur';
    modal.present();
  }

  toggleTextLenght(){
    if(this.toggleMessage === "Read More")
      this.currentDescriptionText = this.product.description;
    else
      this.currentDescriptionText = this.product.description.substring(0, this.shortSize);

      this.toggleMessage = (this.toggleMessage === "Read More") ? "Read Less" : "Read More";
  }

  

}
