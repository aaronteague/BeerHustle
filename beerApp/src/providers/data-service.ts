import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import * as keys from '../../../keys';



 export class Order{
      quantity: number = 0;
      total: number = 0;
      itemName: string = "none";
      paymentType: string = "cash";
      paymentStatus: string = "pending";
      delivered: boolean = false;
      user: string = "some hex value";
      name: string = "Jonn Smith"
      date: string = "";
 }

@Injectable()
export class DataService {

  

   defaultUserInfo = {
     points: 0
   }

   defaultBeerDesign = {
     flexWidth: 50,
     imgOffsetX: 0,
     imgOffsetY: 0,
     textColor: "#fff"
   }




  constructor() {  

    firebase.initializeApp(keys.firebaseConfig);

  }

  submitOrder(itemName: string, quantity: number, total: number, paymentType: string): firebase.Promise<any>{
    let order = new Order();
    order.itemName = itemName;
    order.quantity = quantity;
    order.total = total;
    order.paymentType = paymentType;
    order.user = firebase.auth().currentUser.uid;
    order.name = firebase.auth().currentUser.displayName;

    if(paymentType != "Cash")
      order.paymentStatus = "Complete";

    let date = new Date();
    order.date = date.valueOf().toString();
    let orderEntry = firebase.database().ref('/Orders').child(date.valueOf().toString());


    return orderEntry.set(order);
  }

  getUser(): firebase.User{
    return firebase.auth().currentUser;
  }

  monitorAuthStatus(onUserAuthChangeFunction: any, onErrorFunction: any){
    firebase.auth().onAuthStateChanged(user => {onUserAuthChangeFunction(user); 
      if(user)this.addUserVariablesIfNeeded(user);
    }, error => {onErrorFunction(error.message)});  
  }

  addDesignDataIfNeeded(beerItem: any){

  }

  sendToEdit(product: any){
    console.log(product);
    let productData = firebase.database().ref('/Edit');
    productData.set(product);
  }

   getUserAdditionalData(onceFunc: any) {
     console.log(firebase.auth().currentUser.uid);
    firebase.database().ref('/Users/').child(firebase.auth().currentUser.uid).on('value', (data) => onceFunc(data.val()));

   }

  loginEmail(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  addUserVariablesIfNeeded(user: any){
    let userData = firebase.database().ref('/Users').child(user.uid);
    userData.once('value', snapshot => {
      if(!snapshot.val())
        userData.set(this.defaultUserInfo);
    });
  }

  BlobToUrl(uid: string, blob: any): firebase.Promise<any>{
    return firebase.storage().ref().child(uid).put(blob);
  }


  saveUserData(dataToPersist: any){
    let uid = firebase.auth().currentUser.uid;
    this.BlobToUrl(uid, dataToPersist.photoBlob).then(result => {
      firebase.auth().currentUser.updateProfile({
      displayName: dataToPersist.FirstName,
      photoURL: result.downloadURL
      });
    });
     
  }

  logout(){
    firebase.auth().signOut();
  }

  signUp(email: string, password: string, firstName: string, lastName: string): firebase.Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(() => 
    {
      firebase.auth().currentUser.updateProfile(
        {
          displayName: firstName + " " + lastName, 
          photoURL: "https://firebasestorage.googleapis.com/v0/b/beerapp-7f31b.appspot.com/o/defaultProfilePic2.jpg?alt=media&token=fe4544d0-7740-4526-978f-20595e7dbd99"
        })
    });
  }

  getBeerListing(addFunc: any, changeFunc: any, removeFunc: any){

    let fbQuery = firebase.database().ref('BeerList').orderByChild('index');
    
    fbQuery.on('child_added', (data) => addFunc(data.val()));
    fbQuery.on('child_changed', (data) => changeFunc(data.val()));
    fbQuery.on('child_removed', (data) => removeFunc(data.val()));


  }

  getCompletedOrders(addFunc: any){
    let fbQuery = firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/Orders');
    
    fbQuery.on('child_added', (data) => addFunc(data.val()));
  }

  addPointsToUser(points: number, order: any){
    
    firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value', (data) =>{
      // add the points to the points variable
      firebase.database().ref('Users/' + firebase.auth().currentUser.uid).child('points').set(data.val().points + points);
      // remove the order from orders
      firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/Orders').child(order.date).remove();
    });
  }



    loginGoogle(): firebase.Promise<any> {
     var googleProvider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithRedirect(googleProvider)
  }

  sendReset(email: string): firebase.Promise<any>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
