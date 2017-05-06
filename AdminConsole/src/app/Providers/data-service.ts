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

    imgNameToPath(fileInput: any, pathCallback: any){
    if(fileInput.target.files && fileInput.target.files[0]){
        //console.log(fileInput.target);
      let file: Blob = fileInput.target.files[0] as Blob;
      
      var reader = new FileReader();
      reader.onload = (e) => {
        
        let target = e.target as any;
        pathCallback(target.result);
      }

      reader.readAsDataURL(file);
      }  
    }

    removeEdit(){
        firebase.database().ref('Edit').remove();
    }

    upload(product: any){
        // put image into storage
        var storageRef = firebase.storage().ref();
        var imgRef = storageRef.child(product.title + "/" + product.fileName)
        imgRef.putString(product.filePath, 'data_url').then(snapshot => {
            //put into database
            product.filePath = snapshot.downloadURL;
            firebase.database().ref('BeerList').child(product.title).set(product).then(snapshot => console.log(snapshot));
        });
    }


    remove(product: any){
        // delete from storage
         firebase.storage().ref().child(product.title + "/" + product.fileName).delete();

        // delete from the main database
        firebase.database().ref('BeerList').child(product.title).remove();

        // delete from the edit table
         firebase.database().ref('Edit').remove();
    }

    receiveOrders(onAdd: any, onChange: any, onRemove: any){
        let orderList = firebase.database().ref('Orders');
        orderList.on('child_added', (data) => onAdd(data.key, data.val()));
        orderList.on('child_changed', (data) => onChange(data.key, data.val()));
        orderList.on('child_removed', (data) => onRemove(data.key, data.val()));
    }

    receiveSales(onAdd: any, onChange: any, onRemove: any, dateStart: any, dateEnd: any){
        let orderList = firebase.database().ref('Sales');
        orderList.on('child_added', (data) => onAdd(data.key, data.val()));
        orderList.on('child_changed', (data) => onChange(data.key, data.val()));
        orderList.on('child_removed', (data) => onRemove(data.key, data.val()));
    }
}