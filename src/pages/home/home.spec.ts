import { HomePage} from './home';
import * as moment from "moment"; 
import { MyApp } from '../../app/app.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, ErrorHandler  }    from '@angular/core';
import { By, BrowserModule }   from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler, ActionSheetController } from 'ionic-angular';
import { NavMock } from '../../../test-config/mocks-ionic';
import { AuthProvider } from '../../providers/auth/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular/platform/platform';
import { lang } from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment'; ////
import { AngularFireModule } from 'angularfire2'; //
import { AngularFireAuthModule } from 'angularfire2/auth'; ///
import { AngularFireDatabaseModule } from 'angularfire2/database';////
import { LoginPage } from '../../pages/login/login'; 
let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;
let platform: Platform;
 
let authProvider: AuthProvider;
let actionsheetCtrl: ActionSheetController;
let iab:InAppBrowser;

describe('Page: Home', () => {
beforeEach(async(() => {
 
    TestBed.configureTestingModule({

        declarations: [HomePage,MyApp, LoginPage],
        providers: [
           AuthProvider,
           InAppBrowser,
           StatusBar,
           SplashScreen,
           {provide:ErrorHandler, useClass: IonicErrorHandler},
           AppAvailability,
           AngularFireAuth,
          
         
        
          ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp, { 
             // mode: 'ios',
              mode: 'md', 
             }),
             AngularFireModule.initializeApp(environment.firebaseConfig),///
             AngularFireAuthModule,
             AngularFireDatabaseModule,
        ]

    });

}));

beforeEach(() => {

    fixture = TestBed.createComponent(HomePage);
    comp    = fixture.componentInstance;
  
});

afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
});


it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

});

it('should have the HomePage initialized', () => {
    let mome = moment();
    expect(comp['todaysDate']).toBeDefined(mome);

});

// it("should be clicked shuttles", ()=> {
//     let comp = new HomePage(this.platform, this.authProvider, this.actionsheetCtrl,this.iab);
//     expect(comp.isOn).toBe(false);
//     comp.openCampusBus();
//     expect(comp.isOn).toBe(true);


// });

it("should be clicked shuttles", function() {
    
    expect(comp.isOn).toBe(false);
    comp.openCampusBus();
    expect(comp.isOn).toBe(true);


});

 
// it("should be created five alerts in the alerts array",() => {
//     expect(comp.alerts.length).toBeLessThanOrEqual(5);
   

// });

// //@todo Need to check the firebase stuff and the auth this test is not working because of firebase.
// it("should log out and set the root to the login page", () =>{
//     comp.logOut();
//     expect(comp.nav.getActive.name).toMatch('login');
  


// });

it("should create the dibs webview ", () =>{
    
  comp.openDibs();
  //console.log("Hello " + comp['browser']);
  expect(comp["browser"]).toBeDefined("It is created");


});


// it("should create sliders", () => {
//     expect(comp.slides).toBeDefined();
// });

// it("should create the sildes attributes", () => {
//     let pager = comp.slides.pager; 
//    // console.log(pager);
//     let freeMode = comp.slides.freeMode; 
//    // console.log(freeMode);
//     let centered = comp.slides.centeredSlides; 
//     let loop = comp.slides.loop; 
//     let space = comp.slides.spaceBetween; 
//     let preview = comp.slides.slidesPerView; 

//     expect(pager).toBe(false);
//     expect(freeMode).toBe(false);
//     expect(centered).toBe(false);
//     expect(loop).toBe(false);
//     expect(space).toBe(0);
//     expect(preview).toBe(1);

// });

it("should set the attributes in ngOnInit", () => {
    comp.ngOnInit();
    let pager = comp.slides.pager; 
   // console.log(pager);
    let freeMode = comp.slides.freeMode; 
   // console.log(freeMode);
    let centered = comp.slides.centeredSlides; 
    let loop = comp.slides.loop; 
    let space = comp.slides.spaceBetween; 
    let preview = comp.slides.slidesPerView; 

    expect(pager).toBe(false);
    expect(freeMode).toBe(true);
    expect(centered).toBe(true);
    expect(loop).toBe(true);
    expect(space).toBe(15);
    expect(preview).toBe(1.5);
});



});