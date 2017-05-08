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

    setDelivered(order: any){
        //console.log(order);

        // get and remove order from the orders list
        firebase.database().ref('Orders').child(order.key).remove();

        // add to the Sales list
        firebase.database().ref('Sales').child(order.key).set(order.val());
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
        orderList.on('child_added', (data) => onAdd(data));
        orderList.on('child_changed', (data) => onChange(data));
        orderList.on('child_removed', (data) => onRemove(data));
    }

    receiveSales(onAdd: any, onChange: any, onRemove: any, dateStart: any, dateEnd: any){
        // testing shit
        console.log(dateStart);
        console.log(dateEnd);
        //console.log();
        //console.log();



        let orderList = firebase.database().ref('Sales');
        let query;
        if(dateStart && dateEnd)
            query = orderList.orderByKey().startAt(dateStart.toString()).endAt(dateEnd.toString());
            //query = orderList.orderByKey().startAt("Banana").endAt("ddadsfadf");//.endAt(dateEnd.toString() + "~");

        else
            query = orderList.orderByKey();
        // orderList.startAt(dateStart);
        // orderList.endAt(dateEnd);
        query.on('child_added', (data) => onAdd(data));
        query.on('child_changed', (data) => onChange(data));
        query.on('child_removed', (data) => onRemove(data));
    }
}