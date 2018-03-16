import { Component,ViewChild, NgModule } from "@angular/core";
import { Platform, Nav, ActionSheetController,Slides } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import * as moment from "moment";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
//
 export class HomePage implements OnInit {
//  export class HomePage  {
  public view: any;
  private convertedTodaysDate: any;
  private todaysDate: any;
  isOn = false;
  isDibs = false;
  private browser: any; 
  @ViewChild(Slides) slides: Slides;

  @ViewChild(Nav) nav:Nav; 

  slidesNames = [
    {
      title: "Police beat:Stray Cows, Alien Mask, and Allergic reaction",
      description: "The Ionic Component Documentation.",
      image: "assets/imgs/cop.png"
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open.",
      image: "assets/imgs/cop.png"
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud.",
      image: "assets/imgs/cop.png"
    }
  ];

  public alerts = [
    {
      title: "Assignment 4 due"
    },
    {
      title: "Final Exam"
    },
    {
      title: "Software Document due"
    },
    {
      title: "Meeting with Group"
    },
    {
      title: "Assignment 5 due"
    }
  ];
  constructor(
    public platform: Platform,
 
    private authProvider: AuthProvider,
    public actionsheetCtrl: ActionSheetController,
    private iab:InAppBrowser,
  ) {
    //this.nav.setRoot(HomePage);
    this.platform = platform;            
    //this.platform.ready().then(() => { this.slides.pager = false; this.slides.freeMode = true; this.slides.centeredSlides=true; this.slides.loop=true; this.slides.spaceBetween=15;this.slides.slidesPerView=1.5});
    this.todaysDate = moment();
    this.convertedTodaysDate = moment(this.todaysDate).format(
      "dddd, MMM Do YYYY"
    );
   // console.log(this.convertedTodaysDate);
  }

  // logOut(): void {
  //   this.authProvider.logoutUser().then(() => {
  //     this.nav.setRoot("login");
  //   });
  // }

  ngOnInit() {
    // this.view = this.nav.getActive().name;
    // console.log(this.view);
    this.slides.pager = false; 
    this.slides.freeMode = true; 
    this.slides.centeredSlides=true; 
    this.slides.loop=true; 
    this.slides.spaceBetween=15;
    this.slides.slidesPerView=1.5;
  }
  openCampusBus(){
    this.isOn = !this.isOn;
    this.browser = this.iab.create('http://fgcu.doublemap.com/map/','_blank');
  }
  openDibs(){
    this.isDibs = !this.isDibs;
    this.browser = this.iab.create('http://library.fgcu.edu/dibs','_blank',{location:'no',closebuttoncaption:'Done'});
   // window.open = cordova.InAppBrowser.open; 

  /// bower.show;
  }
  
}
