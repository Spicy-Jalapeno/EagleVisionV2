import { Component } from '@angular/core';


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
import { TapComponent } from './tap';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment'; ////
import { AngularFireModule } from 'angularfire2'; //
import { AngularFireAuthModule } from 'angularfire2/auth'; ///
import { AngularFireDatabaseModule } from 'angularfire2/database';////

let comp: TapComponent;
let fixture: ComponentFixture<TapComponent>;
let de: DebugElement;
let el: HTMLElement;
let platform: Platform;

describe('Componement: Tap', () => {
    beforeEach(async(() => {
     
        TestBed.configureTestingModule({
    
            declarations: [TapComponent,MyApp],
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
    
        fixture = TestBed.createComponent(TapComponent);
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

    it('should check that tapIngo is available', ()=>{
        comp.checkAppAvailability();
        expect(comp.appIsTrue).toBe(false);
    });

// it("should be checking the app name for tapingo",() => {
//    this.platform = platform;
//     let app; 
//     if(this.platform.is('ios')){
//         app = 'tapingo://';
//       }else if(this.platform.is('android')){
//         app = 'com.tapingo.android';
//       }
//     comp.checkAppAvailability();

//     expect(comp.text).toBeTruthy(app);   

// });
    
});