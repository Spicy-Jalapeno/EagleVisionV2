/// <reference path="../../app/WikitudePlugin.d.ts" />
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ActionSheetController } from 'ionic-angular';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ar-ui',
  templateUrl: 'ar-ui.html',

})

export class ArUiPage {
  @ViewChild(Nav) nav: Nav;
  public toggoleShowHide = false;

  constructor(
    public platform: Platform,
    // public nav: Nav,
    public actionsheetCtrl: ActionSheetController,
    public navCtrl: NavController) { }

  ionViewDidEnter() {

    var startupConfiguration: any = { "camera_position": "back" };

    WikitudePlugin.loadARchitectWorld(
      function (success) {
        console.log("ARchitect World loaded successfully.");
      },
      function (fail) {
        console.log("Failed to load ARchitect World!");
      },
      // "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
      // "ir"], // (1) if you have a IR (Image Recognition) World, use this
      //"www/assets/07_3dModels_6_3dModelAtGeoLocation/index.html",  // (2) if you have a GeoLocation World, use this
      "www/assets/POI_Multiple/index.html", 
      ["geo"],  // (2) if you have a GeoLocation World, use this
      // you find other samples or Wikitude worlds in Wikitude Cordova Plugin
      // which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
      <JSON>startupConfiguration
    );
  }

  // goHome() {
  //   this.nav.setRoot(HomePage)
  // }

}
