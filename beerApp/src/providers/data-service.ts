import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/promise';

import * as firebase from 'firebase';
//import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';
import * as keys from '../../../keys';





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


  constructor(public http: Http) {   
    firebase.initializeApp(keys.firebaseConfig);
  }



  getUser(): firebase.User{
    return firebase.auth().currentUser;
  }

  monitorAuthStatus(onUserAuthChangeFunction: any){
    firebase.auth().onAuthStateChanged(user => {onUserAuthChangeFunction(user); 
      if(user)this.addUserVariablesIfNeeded(user);
    });  
  }

  addDesignDataIfNeeded(beerItem: any){
    console.log(beerItem);
    // if(!beerItem.val().design){
    //   console.log("looks like design data doesn't exist for this item, let's create it");
    //   beerItem.child('design').set(this.defaultBeerDesign);
    // }
  }

   getUserAdditionalData(): firebase.Promise<any> {
     return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).once('value');
   }

  loginEmail(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password);
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

  getBeerListing(onChangeFunction: any){

    let refreshBeerArray = (snapshot: any) => {
            let beerArray: any[] = [];
      snapshot.forEach(function(childSnapshot){
        
        //this.addDesignDataIfNeeded(childSnapshot);
        beerArray.push(childSnapshot.val());
        return false;
      });

      onChangeFunction(beerArray);
    };

    let fbList = firebase.database().ref('BeerList').orderByChild('index');

    fbList.once('value', refreshBeerArray);
  }




    loginGoogle(){
     var googleProvider = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithRedirect(googleProvider).then(result => {

      

     });
  }

}
