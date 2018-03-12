import { HomePage} from './home';
import * as moment from "moment"; 
import { MyApp } from '../../app/app.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, ErrorHandler  }    from '@angular/core';
import { By, BrowserModule }   from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NavMock } from '../../../test-config/mocks-ionic';
import { AuthProvider } from '../../providers/auth/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppAvailability } from '@ionic-native/app-availability';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Home', () => {
beforeEach(async(() => {
 
    TestBed.configureTestingModule({

        declarations: [HomePage,MyApp],
        providers: [
           AuthProvider,
           InAppBrowser,
           StatusBar,
           SplashScreen,
           {provide:ErrorHandler, useClass: IonicErrorHandler},
           AppAvailability
         
        
          ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp, { 
             // mode: 'ios',
              mode: 'md', 
             }),
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

});