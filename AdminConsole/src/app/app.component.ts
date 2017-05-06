import { Component } from '@angular/core';
import { DataService } from './Providers/data-service';

import 'rxjs/add/operator/map'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class AppComponent {

  currentTab: string = "Audit";

  errorMsg: string = "";
  product: any;
  imgHeld: boolean = false;
  lastPos = {
    x: 0,
    y: 0
  }

  orderList: any[] = [];
  salesList: any[] = [];


  
  getDefaultProduct(): any {
    return {
    title: "",
     description: "",
     fileName: "",
     filePath: "",
     design: {
       imgOffsetX: 0,
       imgOffsetY: 0,
       textColor: "#fff"
     },
     price: 0,
     index: -1,
     special: ""
    };
  }

  constructor(public dataService: DataService){
  
   this.product = this.getDefaultProduct();

   console.log("doing stuff");
   this.dataService.getEditItem().then(snapshot => {
      if(snapshot.val())
        this.product = snapshot.val();
  });
    
    // let's get that list of orders   
    this.dataService.receiveOrders(
      // on add
      (key, data) => { this.orderList.push(data);},
      // on change
      (key, data) => { },
      // on remove
      (key, data) => { }
    );

    // let's get the list of sales for audit
    this.dataService.receiveSales(
      // on add
      (key, data) => { this.salesList.push(data)},
      // on change
      (key, data) => { },
      // on remove
      (key, data) => { },
      // start date
      "dateTimeGoesHere",
      // end date
      "dateTimeGoesHere"
    );

  }


previewImage(fileInput: any) {
  this.product.fileName = fileInput.target.files[0].name;
  this.dataService.imgNameToPath(fileInput, (url) => {this.product.filePath = url});
}

changeSection(section: string){
  this.currentTab = section;
}

mouseDown(e: any) {
  this.imgHeld = true;
  this.lastPos = {
    x: e.x,
    y: e.y
  };
}

derp(){
  return false;
}

save(){
  this.dataService.upload(this.product);
}

remove(){
  
  this.dataService.remove(this.product);
  this.product = this.getDefaultProduct();
}

createNew(){
  this.product = this.getDefaultProduct();
  this.dataService.removeEdit();
}

loseFocus() {
  this.imgHeld = false;
  this.lastPos.y = 0;
}

mouseMove(e: any){
  if(!this.imgHeld)
    return;
  let posDifference = {
    x: this.lastPos.x - e.x,
    y: this.lastPos.y - e.y
  };
  this.product.design.imgOffsetY = posDifference.y;
  
}

move(amount: number): string {
    return amount + "px"
  }


}
