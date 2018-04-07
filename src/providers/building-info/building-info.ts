
import { Injectable,ViewChild, ElementRef } from '@angular/core';
import { AutoCompleteService } from 'ionic2-auto-complete';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
import { Platform } from 'ionic-angular/platform/platform';


declare var google;
/*
  Generated class for the BuildingInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuildingInfoProvider implements AutoCompleteService{
  //items: any;
  map: any;
  @ViewChild('map') mapElement: ElementRef;
  items = ["Arts Complex", "Aquatic Center", " Ben Griffen Hall", "Cohen Center", "Edwards Halls", "Emergent Technology Institute (ETI)", "Holmes Engineering", "Howard Hall", "Kleist Health Education Center", "Lutgert Hall", "Library", "Marieb Hall", "McTarnaghan Hall", "Merwin Hall", "Music Building", "FGCU Naples Center", "Naples Botanical Gardens", "North Lake Village", "Reed Hall", "Seidler Hall", "Sugden Hall", "Sugden Resort & Hospitality Mgt", "Biscayne Hall", "Eagle Hall", "Evergales Hall", "Plametto Hall", "Ospery Hall","Margaret S. Sugden Welcome Center", "WGCU Broadcast Building","Whitaker Hall"];
  
  buildingLocation = [{
    title: "howard hall",
    lat: "26.465215", 
    lng: "-81.77286",

  },
  {
    title: "seidler Hall",
    location: new google.maps.LatLng("26.463843, -81.775049")
  },
  {
    title:"edwards hall",
    location: new google.maps.LatLng("26.4641958, -81.7750494")
  },
  {
    title:"merwin hall",
    location: new google.maps.LatLng("26.4641909, -81.774476")
  },
  {
    title:"whitaker hall",
    location: new google.maps.LatLng("26.4640435, -81.7741418")
  },
  {
    title:"reed hall",
    location: new google.maps.LatLng("26.464191, -81.773292")
  },
  {
    title:"marieb hall",
    location: new google.maps.LatLng("26.464076, -81.775750")
  },
  {
    title:"lutgert hall",
    location: new google.maps.LatLng("26.463710, -81.776483")
  },
  {
    title:"griffin hall",
    location: new google.maps.LatLng("26.464400, -81.773325")
  },
  ];
 

  constructor(public platform: Platform) {
    console.log('Hello BuildingInfoProvider Provider');
    this.platform = platform;
  //   this.items = [
  //     {title: 'one'},
  //     {title: 'two'},
  //     {title: 'three'},
  //     {title: 'four'},
  //     {title: 'five'},
  //     {title: 'six'}
  // ]
 
  }
  ionViewDidLoad() {
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

      // var position = new google.maps.LatLng("26.4643209", "-81.7733903");
      // var dogwalkMarker = new google.maps.Marker({ position: position, title: "Testing" });
      // dogwalkMarker.setMap(this.map);
    });

  }
  getResults(keyword:String){
    if(keyword && keyword.trim() != ''){
   return  this.items.filter((item) => {
      return item.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
  });    
    }
   // return this.buildingNames;
  }

  getLocation(name:string){
    console.log("Name is "+ name);
    var item;
    
    // for (item in this.buildingLocation){
    //   if(item.title){
     // array.find(x => x.name === 'string 1')
     item = this.buildingLocation.find(x=>x.title === name);
     console.log("THis is item " + item)
       if(item.title === name){
        
      
      console.log("Here is the if statment");
      console.log(item.lat,item.lng);
      var lat = String(item.lat);
      var lng = String(item.lng);
        var position = new google.maps.LatLng(lat,lng);
        console.log(position);   
        console.log(lat);
        console.log(lng);
        var markerNew;
      return   markerNew = new google.maps.Marker({position: position , title: ""});
     //  console.log("Setting up the map");
    //    markerNew.setMap(this.map);
      }
    }
  //}


  
}
