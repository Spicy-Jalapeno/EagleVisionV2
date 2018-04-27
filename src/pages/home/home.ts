import { Component, ViewChild, NgModule, Injectable } from "@angular/core";
import { Platform, Nav, ActionSheetController, Slides, Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import * as moment from "moment";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { UserDataProvider } from '../../providers/user-data/user-data'
import { User } from "firebase/app";

import firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { HTTP } from '@ionic-native/http';

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
  private myData: Array<any> = [];
  isOn = false;
  isDibs = false;
  private browser: any;


  private dbRef: firebase.database.Reference;
  private count = 0;
  private mockUrl = "https://fgcu.instructure.com/login/oauth2/token"
  private jsonString: any
  public url: string;
  public code: any = '';
  public code2: string;
  public masterUrl: string;
  public craps: any;
  public showMe: String = "";
  public crap2: any;
  public access_token: any = '';
  public refresh_token: any = '';
  public jsonArr: Array<any> = [];
  public userDataActive: Array<any> = [];
  public userDataInactive: Array<any> = [];
  public showGraphic: any = 1;
  public showGraphic2: any = 1;
  public showCanvasGraphic: any = 1;
  public showCanvasGraphicImg: any = 1;
  public endAnimation: any = 1;
  public userId: any;
  public courseID: Array<any> = [];
  public courseIDOrdered: Array<any> = [];
  public grades: Array<any> = [];
  public userEnrollments: Array<any> = [];
  public userCourses: Array<any> = [];
  public allAssignmentsArr: Array<any> = [];
  public authKey: any;
  public user: any;




  @ViewChild(Slides) slides: Slides;

  @ViewChild(Nav) nav: Nav;

  slidesNames = [
    {
      title: "Police Beat: Slashed Tires...",
      description: "By <b>News Staff</b> | Apr 20, 2018",
      image: "assets/imgs/cop.png",
      link: "http://eaglenews.org/news/police-beat-slashed-tires-housing-search-and-stolen-bike/"
    },
    {
      title: "Proposal Submitted For 24/4...",
      description: "By <b>Alexandra Figares</b> | Apr 18, 2018",
      image: "assets/imgs/lib.png",
      link: "http://eaglenews.org/news/proposal-submitted-for-24-4-library-program/"
    },
    {
      title: "Johnson Transfer To Miami",
      description: "By <b>Emily Kois</b> | Apr 20, 2018",
      image: "assets/imgs/ball.png",
      link: "http://eaglenews.org/news/johnson-transfer-to-miami/"
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
    private userData: UserDataProvider,
    private authProvider: AuthProvider,
    public actionsheetCtrl: ActionSheetController,
    private iab: InAppBrowser, public navCtrl: NavController, 
    private http: HTTP, 
    private InAppBrowser: InAppBrowser, 
    public alertCtrl: AlertController, 
    private https: HttpClient, 
    private nativePageTransitions: NativePageTransitions
  ) {
    //this.nav.setRoot(HomePage);
    this.platform = platform;
    //this.platform.ready().then(() => { this.slides.pager = false; this.slides.freeMode = true; this.slides.centeredSlides=true; this.slides.loop=true; this.slides.spaceBetween=15;this.slides.slidesPerView=1.5});
    this.todaysDate = moment();
    this.convertedTodaysDate = moment(this.todaysDate).format(
      "dddd, MMM Do YYYY"
    );
    this.userData.currentUserData.subscribe(data => this.myData = data)
    // console.log(this.convertedTodaysDate);

  }

  // logOut(): void {
  //   this.authProvider.logoutUser().then(() => {
  //     this.nav.setRoot("login");
  //   });
  // }

  ngOnInit() {
    console.log(this.myData)
    // this.view = this.nav.getActive().name;
    // console.log(this.view);
    this.slides.pager = false;
    this.slides.freeMode = true;
    this.slides.centeredSlides = true;
    this.slides.loop = true;
    this.slides.spaceBetween = 15;
    this.slides.slidesPerView = 1.5;
   
  }
  openCampusBus() {
    this.isOn = !this.isOn;
    this.browser = this.iab.create('http://fgcu.doublemap.com/map/', '_blank');
  }
  openDibs() {
    this.isDibs = !this.isDibs;
    this.browser = this.iab.create('http://library.fgcu.edu/dibs', '_blank', { location: 'no', closebuttoncaption: 'Done' });
    // window.open = cordova.InAppBrowser.open; 

    /// bower.show;
  }

  openAthletics() {
    this.browser = this.iab.create('http://fgcuathletics.com', '_blank', { location: 'no', closebuttoncaption: 'Done' });
  }

  openGulfline() {
    this.browser = this.iab.create('https://gulfline.fgcu.edu/pls/fgpo/twbkwbis.P_WWWLogin', '_blank', { location: 'no', closebuttoncaption: 'Done' });
  }

  openMail() {
    this.browser = this.iab.create('https://adfs.fgcu.edu/adfs/ls/?client-request-id=e053e0d7-35fc-4c31-8234-27fdca94e484&username=&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=estsredirect%3d2%26estsrequest%3drQIIAY2RPWzTQACFc3FqtQhBxcQGQ1UkkO3z-T8SQ9z8qLJVKElF3KXyz9m-OM4ljt2QCBbExNSBqSNjRiQkxNiBIVM3pC50YEBMiIkBJBKxsMEbPr3x6Xt3GZEXq1vwTxC3IgfDUOR8vGp_JbtxZfPjZfvypyLaz-U7vxavPr84BdewG_UxH0Z-weOgmINbcZ4Px1VBoEXepzThaRgSH_M-TQU6cYV3AJwDMC9rqqTKmoZ0qKgSQpoiIt5FIQo0aTnD92ROVqHOuSLEnKZ5Mgx0RfR95aJ8_UGtyGO0As3IDH8vb4Q0S4-GdJyfMk_rfm7XaS2q18xHsJnLprpz0DESZyZaUZG3nNQkx7Y8lgqjaY26qWNGsEcG9m6yH9lDc7JvdVPYq-doJyWR-DgmcWo70RNCWqNWV2nmNs6mdjEzEJru6d3R8cR3sqB3dOiqWH84Z_5L5RuGXepI6WDBsHSIByQ4r4CvlauQqa6vs5vgZul26UcFvF5bKn978alzRs4aL5-p-ENju7RYE4RDYkz7chKm3uTeuA2LWE9sedSXjQOrIZnY2zMsi3qd3bZ_H1bFExacsOwXFnxjS-83_vXPbw2', '_blank', { location: 'no', closebuttoncaption: 'Done' });
  }

  openNews(link: string) {
    this.browser = this.iab.create(link, '_blank', { location: 'no', closebuttoncaption: 'Done' });
  }
 

  //Function To Log Out A User From The Eagle Vision App
  logOut() {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('login');
    });
  }


}
