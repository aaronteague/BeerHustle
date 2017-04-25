import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from './Providers/data-service';

import { AppComponent } from './app.component';
import { DesignComponent } from './design/design.component';

//import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

//import * as keys from '../../../keys';


@NgModule({
  declarations: [
    AppComponent,
    DesignComponent
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
