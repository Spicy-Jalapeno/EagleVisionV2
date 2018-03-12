import { Component } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability';

import { Platform } from 'ionic-angular/platform/platform';
/**
 * Generated class for the TapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tap',
  templateUrl: 'tap.html'
})
export class TapComponent {
  appExistStatus: any; 
  text: string;

  constructor(private appAvailability: AppAvailability, private platform: Platform) {
    this.platform = platform;
    this.checkAppAvailability();
  }

  checkAppAvailability(){
    console.log('click');
    let app; 
    if(this.platform.is('ios')){
      app = 'twitter://';

    }else if(this.platform.is('android')){
      app = 'com.twitter.android';
    }
    console.log(app);
    this.appAvailability.check(app).then((yes) => {
      console.log(app + ' is available');
      this.appExistStatus = app + ' is available';
    },
  (no) => {
    console.log(app + ' is NOT available ')

    this.appExistStatus = app + ' is NOT available';
  })
  }



}
