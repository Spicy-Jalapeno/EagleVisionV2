import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {

      // used for an example of ngFor and navigation
      this.pages = [
      
      
        { title : 'Home', component:HomePage},
        { title: 'Map', component: MapPage },
       
      ];

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
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component);
   
    }
}

