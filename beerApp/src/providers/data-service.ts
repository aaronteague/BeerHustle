import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/promise';

import * as firebase from 'firebase';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';




@Injectable()
export class DataService {

  // authKey: any;

  // defaultUserInfo = {
  //   FirstName: 'FN',
  //   LastName: 'LN',
  //   points: 0
  // }

  userInfo: any;

  constructor(public http: Http, public af: AngularFire) {   
  }

  isLoggedIn(): boolean{
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser ? true : false;
  }

  getAuthState(onStateChangeFunction: any): any{
    return firebase.auth().onAuthStateChanged(user => {this.userInfo = user; onStateChangeFunction(user);});
  }

  loginEmail(email: string, password: string): firebase.Promise<FirebaseAuthState>{
    return this.af.auth.login({email, password}, {provider: AuthProviders.Password,method: AuthMethods.Password});

  
  }

  getUserData(): FirebaseObjectObservable<any>{
    console.log('/Users/' + firebase.auth().currentUser.uid);
    return this.af.database.object('/Users/' + firebase.auth().currentUser.uid);
  }

  saveUserData(dataToPersist: any): firebase.Promise<any>{
    return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).set(dataToPersist);
  }

  logout(){
    this.af.auth.logout();
  }

  signUp(email: string, password: string, firstName: string, lastName: string): firebase.Promise<FirebaseAuthState>{
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(resolve => {
      this.getAuthState(user => {
        if(user)
          user.updateProfile({
            displayName: firstName + " " + lastName
          });
      });
    });
  }

  getBeerListing(): FirebaseListObservable<any>{
    return this.af.database.list('BeerList');
  }



  saveAuth(key: any){
    
    this.af.auth.getAuth().auth.getToken().then(result => localStorage.setItem('authKey', result)).catch(e => console.log(e));
    //localStorage.setItem('authKey', this.af.auth.getAuth().auth.getToken());
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
