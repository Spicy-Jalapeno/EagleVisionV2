import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { MenuController, NavController, Platform, Alert, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

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
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    afAuth: AngularFireAuth) {

      // used for an example of ngFor and navigation
      this.pages = [
      
      
        { title : 'Home', component:HomePage},
        { title: 'Map', component: MapPage },
       
      ];

    //Firebase config...this will change once we create an auspex-app firebase
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDJaGqHAgjEqKyfFa__prwx78N46DnDm1E",
    //   authDomain: "eagle-vision-dev.firebaseapp.com",
    //   databaseURL: "https://eagle-vision-dev.firebaseio.com",
    //   projectId: "eagle-vision-dev",
    //   storageBucket: "eagle-vision-dev.appspot.com",
    //   messagingSenderId: "209677839358"
    // });

    const authObserver = afAuth.authState.subscribe( user => {
      if (!user) { 
        this.rootPage = 'login';
        authObserver.unsubscribe();
      } else {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
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

