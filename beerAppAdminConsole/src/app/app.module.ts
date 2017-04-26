import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from './Providers/data-service';


// import { DesignComponent } from './design/design.component';
// import { OrderComponent } from './order/order.component';
// import { AuditComponent } from './audit/audit.component';
import { AppComponent } from './app.component';

//import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

//import * as keys from '../../../keys';


@NgModule({
  declarations: [
    
    // DesignComponent,
    // OrderComponent,
    // AuditComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //AngularFireModule.initializeApp(keys.firebaseConfig)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
