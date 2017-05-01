import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as keys from '../../../keys';

@Injectable()
export class DataService {
    constructor() {
        console.log("initializing firebase"); 
        firebase.initializeApp(keys.firebaseConfig);
    }

    getEditItem(): firebase.Promise<any> {
        let editElement = firebase.database().ref('/Edit');
        return editElement.once('value');
    }

    imgNameToPath(fileInput: any, pathCallback: function){
    if(fileInput.target.files && fileInput.target.files[0]){
        //console.log(fileInput.target);
      let file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
       // console.log(e.target);
        pathCallback(e.target.result);
        
      }
      }

      reader.readAsDataURL(file);
    }
}