import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import * as moment from 'moment';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
declare var google; 
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// implements AutoCompleteService
@Injectable()
export class BuildingVendingProvider {
  private buildingData = new BehaviorSubject([]);
  currentBuildingData = this.buildingData.asObservable();

  public buildingInfo: Array<any>;
  public todaysDate: any;
  public item: Array<any> = []; 



  constructor() {
    this.todaysDate = moment();
    var self = this;
    let data = [];
    let buildings = [];
   
    var query = firebase.database().ref(`campus_data/`)
    query.once("value")
      .then(function (snapshot) {
        data.push({
          "buildings": snapshot.val().buildings,
          "vending": snapshot.val().vending
        })
       
        
      })
    this.getBuildingData(data)
   
   
    
    
  
  }





  getBuildingData(data: Array<any>) {
    return this.buildingData.next(data)
  }
 



}



