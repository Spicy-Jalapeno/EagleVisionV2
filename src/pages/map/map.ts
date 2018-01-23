import { Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, NavController, Platform, NavParams, ActionSheetController } from 'ionic-angular';
declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
 
}
 
)
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude : any;
  longitude : any;

  constructor(public platform: Platform,
     public navCtrl: NavController,
     public navParams: NavParams,
     public actionsheetCtrl: ActionSheetController) {

    this.platform = platform;
    this.initializeMap();
  }

  ionViewDidLoad(){
    this.initializeMap();
  }

  initializeMap() {
       this.platform.ready().then(() => {
         let minZoomLevel = 16;
  let mapOptions = {
     zoom: minZoomLevel,
     center: new google.maps.LatLng(26.4643209, -81.7733903),
     mapTypeId: "roadmap",
     disableDefaultUI: true
  }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       var position = new google.maps.LatLng("26.4643209", "-81.7733903");
       var dogwalkMarker = new google.maps.Marker({position: position, title: "Testing"});
       dogwalkMarker.setMap(this.map);
   });

   }

   

}

