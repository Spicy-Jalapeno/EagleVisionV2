import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ActionSheetController } from 'ionic-angular';
import { BuildingInfoProvider } from '../../providers/building-info/building-info';
import { AutoCompleteComponent } from 'ionic2-auto-complete';
declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {
  public markers: Array<any> = [];
  openMenu = false;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar') searchbar: AutoCompleteComponent;
  //buildingInfo: any; 
  buildingSelected: string;
  map: any;
  latitude: any;
  longitude: any;
  buildingNames = ["Arts Complex", "Aquatic Center", " Ben Griffen Hall", "Cohen Center", "Edwards Halls", "Emergent Technology Institute (ETI)", "Holmes Engineering", "Howard Hall", "Kleist Health Education Center", "Lutgert Hall", "Library", "Marieb Hall", "McTarnaghan Hall", "Merwin Hall", "Music Building", "FGCU Naples Center", "Naples Botanical Gardens", "North Lake Village", "Reed Hall", "Seidler Hall", "Sugden Hall", "Sugden Resort & Hospitality Mgt", "Biscayne Hall", "Eagle Hall", "Evergales Hall", "Plametto Hall", "Ospery Hall", "Margaret S. Sugden Welcome Center", "WGCU Broadcast Building", "Whitaker Hall"];
  vending = [
    {
      title:"Ben Hill Griffin Hall",
      lat: "26.464680",
      lng: "-81.773322",
      description:"1 Drink 1 Snack"
    },
    {
      title:"Whitaker Hall",
      lat:"26.463726",
      lng:"-81.774295",
      description:"1 Drink 1 Snack"
    }
  ];
  food = [
    {
      title:"Chick-fil",
      lat: "26.4658274-",
      lng: "81.7717885"
    }
  ]
  constructor(public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    public buildingInfo: BuildingInfoProvider) {

    this.platform = platform;
    this.buildingInfo = buildingInfo;
    this.initializeMap();
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
        disableDefaultUI: true,
        styles:[
          {
            "featureType": "poi.attraction",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.government",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.place_of_worship",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.school",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.sports_complex",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
        
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // var position = new google.maps.LatLng("26.4643209", "-81.7733903");
      // var dogwalkMarker = new google.maps.Marker({ position: position, title: "Testing" });
      // dogwalkMarker.setMap(this.map);
    });

  }

  //setting up markers of searched item. 
  itemSelect() {
    this.buildingSelected = this.searchbar.getValue();
    console.log(this.searchbar.getValue());

    var setup = this.buildingInfo.getLocation(this.buildingSelected.toLowerCase());
    
    setup.setMap(this.map);
  }



  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  goToFood() {
    alert('Account clicked.');
    this.togglePopupMenu();
  }
 
   
     
  goToVending() {
   
   // alert('Vending clicked.');
    this.togglePopupMenu();
    var vending, marker,i,lat,lng,image,loadMarker; 
    image = '../assets/icon/Vending.svg';
    this.clearOverlays();
   for(i=0;i<this.vending.length;i++){

    
    // vending = this.vending[i];
     console.log("vending array "+this.vending[i].title);
     
     console.log("vending array "+this.vending[i][1]);
     console.log("vending array "+this.vending[i][2]);

     lat = +this.vending[i].lat;
     lng = +this.vending[i].lng;
     console.log(lng);
     console.log(lat);

    
     marker = new google.maps.Marker({
       position:{lat:lat,lng:lng},
       title:this.vending[i].title,
       map:this.map,
       icon:image
     });
     
     this.markers.push(marker);
     marker.setMap(this.map);
     
   }
  }

   clearOverlays() {
     console.log("Hello");
    for (var i = 0; i < this.markers.length; i++ ) {
      console.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }


  goToAdmissions() {
   var marker; 
    var content = `
    <div style="float:left;padding:10px;"> <img src="http://i.stack.imgur.com/g672i.png"> </div>
    <div style="float:right;padding10px;">
    <b>UnderGrad Admissions</b>
    <br/>
    <a ion-label href="tel: +239-590-7878">(239) 590-7878</a>
    <br/>
    <a ion-label href="tel: +888-889-1095">(888) 889-1095</a>
    <br/>
    <a href="mailto:admissions@fgcu.edu" data-rel="external"> admissions@fgcu.edu</a>
    </div>
    <div style="float:bottom;padding:10px;">
    <b>Grad Admissions</b>
    <br/>
    <a ion-label href="tel: +239-590-7988">(239) 590-7988</a>
    <br/>
    <a ion-label href="tel: +800-590-3428">(800) 590-3428</a>
    <br/>
    <a href="mailto:graduate@fgcu.edu" data-rel="external"> graduate@fgcu.edu</a>
    </div>
    `
 
    // alert('Admissions clicked.');
    this.togglePopupMenu();
    var infowindow = new google.maps.InfoWindow({
        content:content
    });

    var officeLocation = new google.maps.LatLng(26.465310, -81.772934);
   
    marker = new google.maps.Marker({
      position: officeLocation,
      title: "Admission's Office",
    });
    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
    this.clearOverlays();
    
    this.markers.push(marker);
    
    marker.setMap(this.map);
    
    this.map.setCenter(marker.getPosition());
  }

  // goToHelp() {
  //   alert('Help clicked.');
  //   this.togglePopupMenu();
  // }

  // goToShop() {
  //   alert('Shop clicked.');
  //   this.togglePopupMenu();
  // }1111111

}
