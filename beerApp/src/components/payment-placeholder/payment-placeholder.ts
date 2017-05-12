import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { BeerSearchPage } from '../../pages/beer-search/beer-search';


@IonicPage()
@Component({
  selector: 'payment-placeholder',
  templateUrl: 'payment-placeholder.html'
})
export class PaymentPlaceholder {

  dataService: DataService;
  paymentType: string;
  product: any;
  quantity: number;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.dataService = navParams.get('dataService');
    this.paymentType = navParams.get('paymentType');
    this.product = navParams.get('product');
    this.quantity = navParams.get('quantity');
  }

  cancel(){
    this.navCtrl.pop();
  }

  FinishOrder(){
      this.dataService.submitOrder(this.product.title, this.quantity, this.product.price, this.paymentType).then(() => {
        this.DisplayStatus("Success!  Your beer will be out shortly!")
         this.navCtrl.pop();
         this.navCtrl.pop();

      }, error => {
        this.DisplayStatus(error.message);
      });

  }

  DisplayStatus(status: string){
    let toast = this.toastCtrl.create({
      message: status,
      duration: 3000
    });
    toast.present();
  }

}
