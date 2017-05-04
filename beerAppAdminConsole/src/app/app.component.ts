import { Component } from '@angular/core';
// import * as firebase from 'firebase';
import { DataService } from './Providers/data-service';
// import { DesignComponent } from './Design/design.component';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';



import 'rxjs/add/operator/map'

// class ImageBundle{
//       description: string = "";
//       fileName: string = "";
//       title: string = "";
//       filePath: string = "";
//       catagory: string = "";
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class AppComponent {

  currentTab: string = "Audit";
  // componentData: Component;

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

//   addToStorage() : firebase.storage.UploadTask {
//     const storageRef = firebase.storage().ref(this.imgForm.title).child(this.imgForm.fileName);
//     return storageRef.putString(this.imgForm.filePath, 'data_url');
//   }

//   addToDatabase(imgData){
//  // add directory to database // this may make a race condition
//     let photosRef = firebase.database().ref('BeerList').child(this.imgForm.title);
//     photosRef.set(imgData).then(result => {console.log(result); this.imgForm = new ImageBundle();}).catch(() => console.log("image data not sent"));
//   }

//   sendImageData(){
//     this.errorMsg = "";

//     if(this.imgForm.title.length > 0 
//     && this.imgForm.description.length > 0 
//     && this.imgForm.fileName.length > 0 
//     && this.imgForm.filePath.length > 0)
//     {
//     this.addToStorage().then(result =>
//     {
//       this.imgForm.filePath = result.downloadURL;
//       this.addToDatabase(this.imgForm);
//     }).catch(e => console.log(e));
//     }else{
//       this.errorMsg = "Need to fill out all items before submitting to database."
//     }
   


//   }

previewImage(fileInput: any) {
  this.product.fileName = fileInput.target.files[0].name;
  this.dataService.imgNameToPath(fileInput, (url) => {this.product.filePath = url});
}

changeSection(section: string){
  this.currentTab = section;
}

mouseDown(e: any) {
 // console.log(e);
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
  //console.log("mouse up");
  this.imgHeld = false;
  this.lastPos.y = 0;
}

mouseMove(e: any){
  if(!this.imgHeld)
    return;
  //console.log("mouse move");
  let posDifference = {
    x: this.lastPos.x - e.x,
    y: this.lastPos.y - e.y
  };
  //this.product.design.imgOffsetX = posDifference.x;
  this.product.design.imgOffsetY = posDifference.y;
  
}

move(amount: number): string {
    return amount + "px"
  }

//   previewImage(fileInput: any){
//     if(fileInput.target.files && fileInput.target.files[0]){
//       this.imgForm.fileName = fileInput.target.files[0].name;
//       var reader = new FileReader();
//      // reader.onload = this.setPreviewImage;
//       reader.onload = (e) => {
//         this.imgForm.filePath = reader.result;
//       }
//       }

//       reader.readAsDataURL(fileInput.target.files[0]);
//       consoel.log(this.imgForm);
    
//     //var reader = new FileReader();
//     //reader.addEventListener("load", () => {this.previewImgUrl = reader.result; console.log("derp");}, false);
    
//   }

//   refreshData(snap: any){
//     let data = snap.val();
//     console.log(data);
//   }

//   deleteItem(itemName: string, imgName: string){

//     console.log('trying to delete ' + itemName);

//     firebase.database().ref('BeerList/' + itemName).remove();
//     firebase.storage().ref(itemName + "/" + imgName).delete();
//   }
}
