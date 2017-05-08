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

  dateRange: any;
  HtmlDateFrom: any;
  HtmlDateTo: any;

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

   let fromDate:Date = new Date();
   fromDate.setHours(0);fromDate.setMinutes(0);fromDate.setSeconds(0);

   let toDate:Date = new Date();
   toDate.setHours(23); toDate.setMinutes(59);toDate.setSeconds(59);
   
   this.dateRange = {
     start: fromDate,
     end: toDate
   }

   console.log("doing stuff");
   this.dataService.getEditItem().then(snapshot => {
      if(snapshot.val())
        this.product = snapshot.val();
  });
    
    // let's get that list of orders   
    this.dataService.receiveOrders(
      // on add
      (data) => { this.orderList.push(data);},
      // on change
      (data) => { },
      // on remove
      (data) => {         
        let index = this.orderList.findIndex((element, index, array) => {return element.key == data.key;});

        if(index !== -1)
          this.orderList.splice(index, 1);
       }
    );

    this.SearchSales();

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

changeDelivered(order: any){
  //  if(order.val().delivered)
    order.delivered = true;
    this.dataService.setDelivered(order);
}

SearchSales(){
      // let's get the list of sales for audit
    this.salesList = [];
    this.dataService.receiveSales(
      // on add
      (data) => { this.salesList.push(data)},
      // on change
      (data) => { },
      // on remove
      (key) => { },
      // start date
      this.dateRange.start.valueOf(),
      // end date
      this.dateRange.end.valueOf()
    );
}

translateToDate(){
  // start
  if(this.HtmlDateFrom){
    var startDate = new Date(this.HtmlDateFrom.replace(/-/g,'/').replace('T',' '));
    this.dateRange.start = new Date(startDate);
  }
  //end
  if(this.HtmlDateTo){
    var endDate = new Date(this.HtmlDateTo.replace(/-/g,'/').replace('T',' '));
    this.dateRange.end = new Date(endDate);
  }
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
