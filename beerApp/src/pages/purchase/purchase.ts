import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { DataService } from '../../providers/data-service';

@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {

  dataService: DataService;

  product: any;
  quantity: number;
  price: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.dataService = navParams.get('dataService');
    this.product = navParams.get('product');
    this.quantity = navParams.get('quantity');

    this.price = this.product.price * this.quantity;
  }

  ionViewDidLoad() {
  }

  cancel(){
    this.navCtrl.pop();
  }

  makePurchase(type: string){
    this.dataService.submitOrder(this.product.title, this.quantity, this.price, 'Cash').then(() => {
      this.navCtrl.pop();
      
    });
  }

  payWithGoogle(){
    this.navCtrl.push('PaymentPlaceholder', {
      dataService: this.dataService,
      paymentType: 'Google',
      product: this.product,
      quantity: this.quantity
    });
  }

  payWithPaypal(){
    this.navCtrl.push('PaymentPlaceholder', {
      dataService: this.dataService,
      paymentType: 'Paypal',
      product: this.product,
      quantity: this.quantity
    });
  }

}
