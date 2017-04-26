import { Component } from '@angular/core';
// import * as firebase from 'firebase';
import { DataService } from './Providers/data-service';
// import { DesignComponent } from './Design/design.component';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';



import 'rxjs/add/operator/map'

class ImageBundle{
      description: string = "";
      fileName: string = "";
      title: string = "";
      filePath: string = "";
      catagory: string = "";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // currentTab: string = "Design";
  // componentData: Component;

  errorMsg: string = "";
  imgForm: ImageBundle;
  
 // items: FirebaseListObservable<any[]>;
 // af: AngularFire;

  constructor(public dataService: DataService){
    // this.componentData = new DesignComponent();
   // this.imgForm = new ImageBundle();
   // this.af = af;

   // this.items = af.database.list('/BeerList');

  }

  addToStorage() : firebase.storage.UploadTask {
    const storageRef = firebase.storage().ref(this.imgForm.title).child(this.imgForm.fileName);
    return storageRef.putString(this.imgForm.filePath, 'data_url');
  }

  addToDatabase(imgData){
 // add directory to database // this may make a race condition
    let photosRef = firebase.database().ref('BeerList').child(this.imgForm.title);
    photosRef.set(imgData).then(result => {console.log(result); this.imgForm = new ImageBundle();}).catch(() => console.log("image data not sent"));
  }

  sendImageData(){
    this.errorMsg = "";

    if(this.imgForm.title.length > 0 
    && this.imgForm.description.length > 0 
    && this.imgForm.fileName.length > 0 
    && this.imgForm.filePath.length > 0)
    {
    this.addToStorage().then(result =>
    {
      this.imgForm.filePath = result.downloadURL;
      this.addToDatabase(this.imgForm);
    }).catch(e => console.log(e));
    }else{
      this.errorMsg = "Need to fill out all items before submitting to database."
    }
   


  }

  previewImage(fileInput: any){
    if(fileInput.target.files && fileInput.target.files[0]){
      this.imgForm.fileName = fileInput.target.files[0].name;
      var reader = new FileReader();
     // reader.onload = this.setPreviewImage;
      reader.onload = (e) => {
        this.imgForm.filePath = reader.result;
      }
      }

      reader.readAsDataURL(fileInput.target.files[0]);
      
    
    //var reader = new FileReader();
    //reader.addEventListener("load", () => {this.previewImgUrl = reader.result; console.log("derp");}, false);
    
  }

  refreshData(snap: any){
    let data = snap.val();
    console.log(data);
  }

  deleteItem(itemName: string, imgName: string){

    console.log('trying to delete ' + itemName);

    firebase.database().ref('BeerList/' + itemName).remove();
    firebase.storage().ref(itemName + "/" + imgName).delete();
  }
}
