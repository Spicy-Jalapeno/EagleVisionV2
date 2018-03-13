import {  ArUiPage } from './ar-ui';
import * as moment from "moment"; 
import { MyApp } from '../../app/app.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement, ErrorHandler  }    from '@angular/core';
import { By, BrowserModule }   from '@angular/platform-browser';
import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppAvailability } from '@ionic-native/app-availability';
import { CameraPreview } from '@ionic-native/camera-preview';
import { browser, element, by, ElementFinder } from 'protractor';

let comp:  ArUiPage;
let fixture: ComponentFixture<ArUiPage>;
let de: DebugElement;
let el: HTMLElement;
describe('Page: AR', () => {
beforeEach(async(() => {

    TestBed.configureTestingModule({
        declarations: [ ArUiPage,MyApp],
        providers: [
           AuthProvider,
           InAppBrowser,
           StatusBar,
           SplashScreen,
           {provide:ErrorHandler, useClass: IonicErrorHandler},
           AppAvailability,
            CameraPreview
        
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
    fixture = TestBed.createComponent(ArUiPage);
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

it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
});

});