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

  currentTab: string = "Design";
  // componentData: Component;

  errorMsg: string = "";
  product: any;
  imgHeld: boolean = false;
  lastPos = {
    x: 0,
    y: 0
  }


  
 // items: FirebaseListObservable<any[]>;
 // af: AngularFire;

  constructor(public dataService: DataService){
    var productTemplate: = {
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
    // this.componentData = new DesignComponent();
   // this.imgForm = new ImageBundle();
   // this.af = af;
   this.product = productTemplate;

   console.log("doing stuff");
   this.dataService.getEditItem().then(snapshot => {
      //console.log(snapshot.val());
      this.product = snapshot.val();
  });
    //}.catch(() => {console.log});
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
