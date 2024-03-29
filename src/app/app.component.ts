/// <reference path="WikitudePlugin.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { TapComponent } from '../components/tap/tap';
import { SettingsPage } from '../pages/settings/settings';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any}>;
  constructor(afAuth: AngularFireAuth, platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {

      // used for an example of ngFor and navigation
      this.pages = [
      
      
        { title : 'Home', component:HomePage},
        { title: 'Map', component: MapPage },
        { title: 'More...', component: MorePage},
        { title: 'TapInGo', component:TapComponent},
        {title : 'Settings', component:SettingsPage}
       
      ];

    // //Firebase config...this will change once we create an auspex-app firebase
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDJaGqHAgjEqKyfFa__prwx78N46DnDm1E",
    //   authDomain: "eagle-vision-dev.firebaseapp.com",
    //   databaseURL: "https://eagle-vision-dev.firebaseio.com",
    //   projectId: "eagle-vision-dev",
    //   storageBucket: "eagle-vision-dev.appspot.com",
    //   messagingSenderId: "209677839358"
    // });

     //checking if user is logged in previously...if not, take to login page...if so, bring to home
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

      WikitudePlugin._sdkKey = "Jh7D5P3hTGcssQUaBAfAPKFR4pAGMqZuiuDy2o2aOvSfNDo4GQCPs180P8BeDP4CxGBNkwfc6El1uC0+uzRYjPe7ysUZq0YoB5bi3dbHY0cvDoykvR9v95U7GDqlDCa1Sd7YZztK1Adai/aMdwQrWXH0tnT/mKfUarMLHpBYZnpTYWx0ZWRfXwBcaVWusbiUd+ZmjTv5d1b46zAGmZqYwCgemc+Ziwuh4BV8bKED7axJlGlLIGDCSDaZfqKmLiVeVwq7aqVnIYj5Xwrtl/nhG0XZtEx1aiER7DjzLI9OC2n9AUb33aA/XsyB2lJYoFQnCmJ6+W/SiNKD10+/yDnzlf7xKgrZ05QgkDWNHx7R56xQlWgZjZbC/Qyz5ku8JFkEQ0UBhiYAPXA10XcHsIERuyWwdq224uLJWDM0yKL42pdYVnHkyeRUakQFBVuelN0IdO0i6w0nwXArSXPzFpiQuBoQGyR4H9FrRS8zA30mO3l4pOg/INmfo0bH9YXS6cWzaPkcK3hWcs0QkMFzoe95aFuDKeZV6etoDy3vX29uEt92Ku/FVewlsAZrJBkNRKqvLZpZLvyxjhhk2Ycq4ZsjVvN/fkJktvGjNRujSJj8PHOOPQOPlgy4a9UUOvprFXTSvqe8Mwa1a00Ri20ewwQauWTyqDiKNTZnDoqbsg0IP/FdhyIgSQrB/Mf13PUu5fppXGEw82Ee/qLKLY8Rc48bRmhjnH9MXNJOI5WjI5oykFI=";
    
      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
        function(success) {
          console.log("Your platform supports AR/Wikitude. Have fun developing!!");
        },
        function(fail) {
          console.log("Your platform failed to run AR/Wikitude: "+fail);
        },
        [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
    );

    /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
             * through the function below for the direction Ionic app --> Wikitude SDK 
             * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
             * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
            // set the function to be called, when a "communication" is indicated from the AR View  

            WikitudePlugin.setJSONObjectReceivedCallback(obj => {
      
              console.log("setJSONObjectReceivedCallback ..."+JSON.stringify(obj));
              // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic)
              if (obj["action"]){
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
                                  WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
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
          WikitudePlugin.onWikitudeOK = function() {
              console.log("Things went ok.");
          }
          
          /**
           * Define the generic failure callback
           */
          WikitudePlugin.onWikitudeError = function() {
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

