import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/promise';

import * as firebase from 'firebase';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseObjectObservable} from 'angularfire2';




@Injectable()
export class DataService {

  authKey: any;

  defaultUserInfo = {
    FirstName: 'FN',
    LastName: 'LN',
    points: 0
  }

  constructor(public http: Http, public af: AngularFire) {   
  }

  isLoggedIn(): boolean{
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser ? true : false;
  }

  getAuthState(): Observable<FirebaseAuthState>{
    // this.af.auth.subscribe(authState => 
    // {
      
    // });
  

   // firebase.auth().currentUser;
    

    return this.af.auth;


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
    var creds: any = {email: email, password: password };
    return this.af.auth.createUser(creds).then(auth => {
      if(!auth)
        return;
      let userEntry = firebase.database().ref('Users').child(auth.uid);
      let newUser = this.defaultUserInfo;
      newUser.FirstName = firstName;
      newUser.LastName = lastName;
      userEntry.set(newUser);
    });
    
  }

  getBeerListing(): FirebaseListObservable<any>{
    return this.af.database.list('BeerList');
  }

  getUserInfo(){

  }

  saveAuth(key: any){
    this.authKey = key;
    this.af.auth.getAuth().auth.getToken().then(result => localStorage.setItem('authKey', result)).catch(e => console.log(e));
    //localStorage.setItem('authKey', this.af.auth.getAuth().auth.getToken());
  }

}
