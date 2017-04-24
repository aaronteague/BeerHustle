import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as keys from '../../../keys';

@Injectable()
export class DataService {
    constructor() {
        console.log("initializing firebase"); 
        firebase.initializeApp(keys.firebaseConfig);
    }
}