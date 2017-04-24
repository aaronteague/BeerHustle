import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPlaceholder } from './payment-placeholder';

@NgModule({
  declarations: [
    PaymentPlaceholder,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPlaceholder),
  ],
  exports: [
    PaymentPlaceholder
  ]
})
export class PaymentPlaceholderModule {}
