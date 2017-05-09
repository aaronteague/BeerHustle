import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/promise';

import * as firebase from 'firebase';
//import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
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

  

  //  defaultOrder = {
  //    quantity: 0,
  //    total: 0,
  //    item: "none",
  //    paymentType: "cash",
  //    payment: "pending",
  //    delivered: false
  //  }


  constructor() {  
    console.log("initializing firebase"); 
    firebase.initializeApp(keys.firebaseConfig);

    //test stuff
    
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
    //console.log(beerItem);

  }

  sendToEdit(product: any){
    console.log(product);
    let productData = firebase.database().ref('/Edit');
    productData.set(product);
  }

   getUserAdditionalData(): firebase.Promise<any> {
     return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).once('value');
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


  saveUserData(dataToPersist: any): firebase.Promise<any>{
    return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).set(dataToPersist);
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
          photoURL: "https://firebasestorage.googleapis.com/v0/b/beerapp-7f31b.appspot.com/o/defaultProfilePic.jpg?alt=media&token=c7469d20-e9d7-44ab-b798-4d4adcaea3b3"
        })
      //this.addUserVariablesIfNeeded(firebase.auth().currentUser);
    });
  }

  getBeerListing(addFunc: any, changeFunc: any, removeFunc: any){

    let fbQuery = firebase.database().ref('BeerList').orderByChild('index');
    
    fbQuery.on('child_added', (data) => addFunc(data.val()));
    fbQuery.on('child_changed', (data) => changeFunc(data.val()));
    fbQuery.on('child_removed', (data) => removeFunc(data.val()));



    // let refreshBeerArray = (snapshot: any) => {
    //         let beerArray: any[] = [];
    //   snapshot.forEach(function(childSnapshot){
        
    //     //this.addDesignDataIfNeeded(childSnapshot);
    //     beerArray.push(childSnapshot.val());
    //     return false;
    //   });

    //   onChangeFunction(beerArray);
    // };

    // let fbList = firebase.database().ref('BeerList').orderByChild('index');

    // fbList.once('value', refreshBeerArray);
  }




    loginGoogle(): firebase.Promise<any> {
     var googleProvider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithRedirect(googleProvider)
  }

  sendReset(email: string): firebase.Promise<any>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
