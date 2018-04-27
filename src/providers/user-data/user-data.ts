import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import * as moment from 'moment';
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {
  private userData = new BehaviorSubject([]);
  currentUserData = this.userData.asObservable();

  public todaysDate: any;
  public user: any;
  constructor() {
    this.todaysDate = moment();
    var self = this;
    let data = [];
    this.user = firebase.auth().currentUser.uid
    var query = firebase.database().ref(`users/${this.user}`)
    query.once("value")
      .then(function (snapshot) {
        data.push({
          "user_analytics": snapshot.val().user_analytics,
          "user_profile": snapshot.val().user_profile
        })
      })
    this.getUserData(data)
  }
  getUserData(data: Array<any>) {
    return this.userData.next(data)
  }
}



