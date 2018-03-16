import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';
import * as moment from 'moment';


@Injectable()
export class AuthProvider {

 private todaysDate: any;
 private convertedTodaysDate: any;
 private userId: any;
 private user: any;
 constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {

   this.todaysDate = moment();
   this.convertedTodaysDate = moment(this.todaysDate).format("MM-DD-YYYY")

 }

 loginUser(email: string, password: string): firebase.Promise<any> {
   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
 }

 // signupUser(email: string, password: string): firebase.Promise<void> {
 //   return firebase
 //     .auth()
 //     .createUserWithEmailAndPassword(email, password)
 //     .then(newUser => {
 //       firebase
 //         .database()
 //         .ref(`/user_profile/${newUser.uid}/email`)
 //         .set(email);
 //     })
 //     .catch(error => {
 //       console.error(error);
 //       throw new Error("couldnt create profile");
 //     });
 // }

 //FireBase Cloud Function to increment total_user count when a user creates a new account
 signupUser(email: string, password: string): firebase.Promise<any> {
   return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
     this.user = firebase.auth().currentUser;
     this.afDatabase.object(`users/${newUser.uid}/user_profile/`).set({
       email: email,
       user_uid: newUser.uid,
       date_created: this.convertedTodaysDate
     }).catch(error => {
       console.error(error);
       throw new Error("couldnt create profile");
     });
   }).then(() => {
     this.user.sendEmailVerification().then(function () {
       // Email sent.
     }).catch(function (error) {
       console.log(error)
     });
   }).then(() => {
     firebase.database().ref(`users/total_users/`).transaction(eventSnapshot => {
       console.log(eventSnapshot);
       console.log(eventSnapshot + 1);
       eventSnapshot += 1;
       return eventSnapshot;
     })
   })
 }

 // resetPassword(email: string): firebase.Promise<void> {
 //   this.userId = firebase.auth().currentUser.uid;
 //   console.log(this.userId + " Is Resetting Their Password")
 //   return this.userId.sendPasswordResetEmail(email);
 // }

 resetPassword(email: string): firebase.Promise<void> {
   return this.afAuth.auth.sendPasswordResetEmail(email);
 }

 // logoutUser(): firebase.Promise<void> {
 //   const userId: string = firebase.auth().currentUser.uid;
 //   firebase
 //     .database()
 //     .ref(`/userProfile/${userId}`)
 //     .off();
 //   return firebase.auth().signOut();
 // }
 logoutUser(): firebase.Promise<void> {
   return this.afAuth.auth.signOut();
 }
}