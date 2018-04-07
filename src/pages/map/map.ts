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

@IonicPage({

}

)
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  openMenu = false;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar') searchbar: AutoCompleteComponent;
  //buildingInfo: any; 
  buildingSelected: string;
  map: any;
  latitude: any;
  longitude: any;
  buildingNames = ["Arts Complex", "Aquatic Center", " Ben Griffen Hall", "Cohen Center", "Edwards Halls", "Emergent Technology Institute (ETI)", "Holmes Engineering", "Howard Hall", "Kleist Health Education Center", "Lutgert Hall", "Library", "Marieb Hall", "McTarnaghan Hall", "Merwin Hall", "Music Building", "FGCU Naples Center", "Naples Botanical Gardens", "North Lake Village", "Reed Hall", "Seidler Hall", "Sugden Hall", "Sugden Resort & Hospitality Mgt", "Biscayne Hall", "Eagle Hall", "Evergales Hall", "Plametto Hall", "Ospery Hall", "Margaret S. Sugden Welcome Center", "WGCU Broadcast Building", "Whitaker Hall"];

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
        disableDefaultUI: true
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

  goToAccount() {
    alert('Account clicked.');
    this.togglePopupMenu();
  }

  goToVending() {
    alert('Vending clicked.');
    this.togglePopupMenu();
  }

  goToCups() {
    alert('Cups clicked.');
    this.togglePopupMenu();
  }

  goToLeaderboard() {
    alert('Leaderboard clicked.');
    this.togglePopupMenu();
  }

  goToHelp() {
    alert('Help clicked.');
    this.togglePopupMenu();
  }

  goToShop() {
    alert('Shop clicked.');
    this.togglePopupMenu();
  }

}
