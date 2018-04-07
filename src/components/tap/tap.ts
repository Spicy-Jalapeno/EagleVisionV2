import { Component, ViewChild } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability';

import { Platform, Nav } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the TapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export const myConst = {
  tapingoApp: {
    ios: {
      storeUrl: 'https://itunes.apple.com/us/app/tapingo/id423822370?mt=8',
      appId: 'tapingo://'
    },
    android: {
      storeUrl: 'market://details?id=com.tapingo.android',
      appId: 'com.tapingo.android'
    }
  }
}
@Component({
  selector: 'tap',
  templateUrl: 'tap.html'
})
export class TapComponent {
  @ViewChild(Nav) nav: Nav;
  appExistStatus: any; 
  appIsTrue = false; 
  text: string;

  constructor(private appAvailability: AppAvailability, private plt: Platform) {
    this.plt = plt;
    this.checkAppAvailability();
    this.nav.setRoot(HomePage);
  }
 

  // checkAppAvailability(){
  //   //  console.log('click');
  //     let app; 
  
  //     if(this.platform.is('ios')){
  //       app = 'tapingo://';
  
  //     }else if(this.platform.is('android')){
  //       app = 'com.tapingo.android';
  //     }
  //    // console.log(app);
  //     this.appAvailability.check(app).then((yes) => {
  //    //   console.log(app + ' is available');
  //       this.appExistStatus = app + ' is available';
  //       this.appIsTrue = true; 
  //       this.text = app; 
  //       if(this.platform.is('ios')){
  
  //       }else if(this.platform.is('android')){
  
  //       }
  //     },
  //   (no) => {
  //    // console.log(app + ' is NOT available ')
  
  //     this.appExistStatus = app + ' is NOT available';
  //     this.appIsTrue = false; 
  //     this.text = app; 
  //   })
  //   }

  // Need to install in an android phone and check that it installs and opens the application 
  // For Ios one needs to open the info.plist and add 
//   <key>LSApplicationQueriesSchemes</key>
// <array>
// <string>tapingo</string>

// </array>
//open the plist in an external editior not xcode it makes it easier to edit. 
    checkAppAvailability(){
      if (this.plt.is('android')) {
        let appId = myConst.tapingoApp.android.appId;
        let appStarter = (window as any).startApp.set({ "package": appId });
        appStarter.start(function (msg) {
           console.log('starting tapingo app: ' + msg);
        }, function (err) {
          console.log('tapingo app not installed', err);
          window.open(myConst.tapingoApp.android.storeUrl, '_system');
        });
      } else if (this.plt.is('ios')) {
        let appId = myConst.tapingoApp.ios.appId;
        let appStarter = (window as any).startApp.set(appId);
        appStarter.start(function (msg) {
          console.log('starting tapingo app: ' + msg);
        }, function (err) {
          console.log('tapingo app not installed', err);
          window.open(myConst.tapingoApp.ios.storeUrl, '_system'
          );
        });
      } else {
        let msg_err = "Platform not supported";
        alert(msg_err);
        console.log(msg_err);
      }
    }
      }
    
    


//}
