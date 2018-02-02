import { Component } from '@angular/core';
import {Platform, Nav , ActionSheetController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public platform: Platform, public nav: Nav, private authProvider: AuthProvider,public actionsheetCtrl: ActionSheetController) {
    //this.nav.setRoot(HomePage);
    this.platform = platform;
  }

 

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.nav.setRoot('login');
    });
  }

}
