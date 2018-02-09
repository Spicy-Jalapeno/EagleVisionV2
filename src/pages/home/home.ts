import { Component } from '@angular/core';
import {Platform, Nav , ActionSheetController, NavController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';
import firebase from 'firebase';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private todaysDate: any;
  private dbRef: firebase.database.Reference;
  private convertedTodaysDate: any;
  private count= 0;
  private view: any;


  constructor(public navCtrl: NavController, private authProvider: AuthProvider) {
    this.todaysDate = moment();
    this.convertedTodaysDate = moment(this.todaysDate).format("MM-DD-YYYY")
    console.log(this.convertedTodaysDate)    
  }

  ngOnInit(){
    this.view = this.navCtrl.getActive().name;
    console.log(this.view)
  }

  //Function To Log Out A User From The Eagle Vision App
  logOut() {
      this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('login');
    });
  }

  increment(): void {
    this.count = this.count + 1;
    firebase.database().ref(`test_increment/home/`+ this.convertedTodaysDate).transaction( eventSnapshot => {
      console.log(eventSnapshot);
      console.log(eventSnapshot + 1);
      eventSnapshot += 1;
      console.log("count", this.count)
      return eventSnapshot;
    });
  }

}
