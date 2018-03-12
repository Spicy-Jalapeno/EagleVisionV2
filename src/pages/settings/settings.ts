import { Component } from '@angular/core';
import {ModalController, IonicPage, Platform, Nav , ActionSheetController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ModalPage } from './modal/modal';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public view: any;

  constructor(public modalCtrl: ModalController,public platform: Platform, public nav: Nav, private authProvider: AuthProvider,public actionsheetCtrl: ActionSheetController) {
    //this.nav.setRoot(HomePage);
    this.platform = platform;
   
  }

  openModal(){
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

 

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.nav.setRoot('login');
    });
  }

  ngOnInit(){
    this.view = this.nav.getActive().name;
    console.log(this.view);
  }
}
