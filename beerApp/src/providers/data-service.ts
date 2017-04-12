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


  constructor(public http: Http) {   
    firebase.initializeApp(keys.firebaseConfig);
  }



  getUser(): firebase.User{
    return firebase.auth().currentUser;
  }

  monitorAuthStatus(onUserAuthChangeFunction: any){
    firebase.auth().onAuthStateChanged(user => onUserAuthChangeFunction(user) );  
  }

   getUserAdditionalData(): firebase.Promise<any> {
     return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).once('value');
   }

  loginEmail(email: string, password: string){
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
    });
  }

  getBeerListing(onChangeFunction: any){
    
    firebase.database().ref('BeerList').once('value', function(snapshot) {
      let beerArray: any[] = [];
      snapshot.forEach(function(childSnapshot){
        beerArray.push(childSnapshot.val());
        return false;
      });
      onChangeFunction(beerArray);
    });

  }




    loginGoogle(){
    // var googleProvider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithRedirect(googleProvider).then(result => {
    //   // this gives you a google access token.  You can use it to access the google api
    //   var token = result.credential.accessToken;
    
    //   // the signed-in user info.
    //   var user = result.user;

    //   // check if user content exists, create if needed
    //   let userEntry = firebase.database().ref('Users').child(result.credential.uid);
    //   userEntry.once('value', snapshot => {
    //     if(snapshot.val() === null) // looks like there isn't data here, let's make some
    //       userEntry.set(this.defaultUserInfo);
    //   })
      
    // }).catch(error => {
    //   // uh oh, got some error, handle it bruh
    //   console.log(error.message);
      

    // });
  }

}
