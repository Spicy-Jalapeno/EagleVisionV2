import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';



@Injectable()
export class AuthProvider {

  public userId: any;
  public user: any;
  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) { }

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

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.user = firebase.auth().currentUser;
      this.afDatabase.object(`/user_profile/${newUser.uid}`).set({
        email: email
      });
    }).then(()=>{
      this.user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        console.log(error)
      });
    })
      // .catch(error => {
      //   console.error(error);
      //   throw new Error("couldnt create profile");
      // });
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