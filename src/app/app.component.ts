/// <reference path="WikitudePlugin.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { MenuController, NavController, Platform, Alert, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { ArUiPage } from '../pages/ar-ui/ar-ui';
import { SettingsPage } from '../pages/settings/settings';
import { TapComponent } from '../components/tap/tap';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;
  constructor(afAuth: AngularFireAuth, platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {

    // used for an example of ngFor and navigation
    this.pages = [


      { title: 'Home', component: HomePage, active: true, icon: 'home' },
      { title: 'Canvas', component: HomePage, active: false, icon: 'custom-Canvas' },
      { title: 'Map', component: MapPage, active: false, icon: 'map' },
      { title: 'More...', component: MorePage, active: false, icon: 'ionic' },
      { title: 'TapInGo', component: TapComponent, active: false, icon: 'ionic' },
      { title: 'Settings', component: SettingsPage, active: false, icon: 'ionic' },
      { title: 'AR', component: ArUiPage, active: false, icon: 'ionic' }

    ];

    // Firebase config...this will change once we create an auspex-app firebase
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDJaGqHAgjEqKyfFa__prwx78N46DnDm1E",
    //   authDomain: "eagle-vision-dev.firebaseapp.com",
    //   databaseURL: "https://eagle-vision-dev.firebaseio.com",
    //   projectId: "eagle-vision-dev",
    //   storageBucket: "eagle-vision-dev.appspot.com",
    //   messagingSenderId: "209677839358"
    // });

    const authObserver = afAuth.authState.subscribe(user => {
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

      //WikitudePlugin._sdkKey = "IHjJ+NCJO5CcF4PvDQprVSEk33sFwbYdPCAbwoXKDXbYhyvfFiFq/E7MVGTmLWdMsaV4FPcsTbJakvUeMfmnRRdV0b0m9lzCadeMY48JtN2pva5EMl1jAfoyquy+06iWu6FT/99PzkIE1ffYY4AzSak91ZxXOhTCzKZ4ktk3KaFTYWx0ZWRfX/f0OHzp29/QS1ucmGH9qGcGyysJNw+9mIzQHF3VIDAREhWUaDYEFp2YX6tj1oG36bsMtsjkq9qLSRqTsUpYKwmTS/tFqTGTTA2h6WvmnGGfnIcIAspS5vENY0YCldb0ysS2uhN56rGCCTh15slCnVzPJ6DdJQlN8s01W5On9wh1gI1pzxQDjrgYZSNfsAj9N0xlBaFzpydMHp+SRGChiug2hwLBM7KckCfH13P67vcFAVtFxGEVs/26fHV0Ek2tXy4hwUMp2mmDXf33ZoyXkvL1C4cqzB+1/4wr55WOx+KBy0y0ER7BsSxkL66b40mQ8s/Rvv8Me1A7QjK5PUVPZ4Wpn5f14tmCVnuhRReBqt7U9mWebITMese2ywuMxViNsKB8tYfBQLJwIekKmCU4ug+agM6wuAssnQe0JOv4xZHAh85TpoTjZspxV9TWPb7MAk7nMRJu3ESliGk87HvqOkEpD4Fctl7ACHaHH3SPs8q08ELxFdg0krA=";
      WikitudePlugin._sdkKey = "Jh7D5P3hTGcssQUaBAfAPKFR4pAGMqZuiuDy2o2aOvSfNDo4GQCPs180P8BeDP4CxGBNkwfc6El1uC0+uzRYjPe7ysUZq0YoB5bi3dbHY0cvDoykvR9v95U7GDqlDCa1Sd7YZztK1Adai/aMdwQrWXH0tnT/mKfUarMLHpBYZnpTYWx0ZWRfXwBcaVWusbiUd+ZmjTv5d1b46zAGmZqYwCgemc+Ziwuh4BV8bKED7axJlGlLIGDCSDaZfqKmLiVeVwq7aqVnIYj5Xwrtl/nhG0XZtEx1aiER7DjzLI9OC2n9AUb33aA/XsyB2lJYoFQnCmJ6+W/SiNKD10+/yDnzlf7xKgrZ05QgkDWNHx7R56xQlWgZjZbC/Qyz5ku8JFkEQ0UBhiYAPXA10XcHsIERuyWwdq224uLJWDM0yKL42pdYVnHkyeRUakQFBVuelN0IdO0i6w0nwXArSXPzFpiQuBoQGyR4H9FrRS8zA30mO3l4pOg/INmfo0bH9YXS6cWzaPkcK3hWcs0QkMFzoe95aFuDKeZV6etoDy3vX29uEt92Ku/FVewlsAZrJBkNRKqvLZpZLvyxjhhk2Ycq4ZsjVvN/fkJktvGjNRujSJj8PHOOPQOPlgy4a9UUOvprFXTSvqe8Mwa1a00Ri20ewwQauWTyqDiKNTZnDoqbsg0IP/FdhyIgSQrB/Mf13PUu5fppXGEw82Ee/qLKLY8Rc48bRmhjnH9MXNJOI5WjI5oykFI=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
        function (success) {
          console.log("Your platform supports AR/Wikitude. Have fun developing!!");
        },
        function (fail) {
          console.log("Your platform failed to run AR/Wikitude: " + fail);
        },
        [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
               * through the function below for the direction Ionic app --> Wikitude SDK 
               * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
               * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  

      WikitudePlugin.setJSONObjectReceivedCallback(obj => {

        console.log("setJSONObjectReceivedCallback ..." + JSON.stringify(obj));
        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic)
        if (obj["action"]) {
          switch (obj["action"]) {
            case "closeWikitudePlugin":
              // close wikitude plugin
              WikitudePlugin.close();
              break;
            case "captureScreen":

              WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                  console.log("snapshot stored at:\n" + absoluteFilePath);

                  // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                  WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath + "');");
                },
                (errorMessage) => {
                  console.log(errorMessage);
                },
                true, null
              );

              break;
            default:
              console.warn("action not handled => ", obj);
              break;
          } // end switch
        } // end if (obj.action)
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function () {
        console.log("Things went ok.");
      }

      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function () {
        console.log("Something went wrong");
      }

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.component);

  }

}

