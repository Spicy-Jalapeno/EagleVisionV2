import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  @ViewChild('content') navCtrl: NavController
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {



    //Firebase config...this will change once we create an auspex-app firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDJaGqHAgjEqKyfFa__prwx78N46DnDm1E",
      authDomain: "eagle-vision-dev.firebaseapp.com",
      databaseURL: "https://eagle-vision-dev.firebaseio.com",
      projectId: "eagle-vision-dev",
      storageBucket: "eagle-vision-dev.appspot.com",
      messagingSenderId: "209677839358"
    });

     //checking if user is logged in previously...if not, take to login page...if so, bring to home
     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = 'login';
        unsubscribe();
      } else { 
        this.rootPage = HomePage;
        unsubscribe();
      }
      
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}

