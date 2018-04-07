import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { ArUiPage } from '../pages/ar-ui/ar-ui';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { IncrementationServiceProvider } from '../providers/incrementation-service/incrementation-service';
import { PageNameServiceProvider } from '../providers/page-name-service/page-name-service';
import { SettingsPage } from '../pages/settings/settings';


import {AutoCompleteModule} from 'ionic2-auto-complete';
import { FormsModule } from '@angular/forms';
import { BuildingInfoProvider } from '../providers/building-info/building-info';

import { HttpClient } from '@angular/common/http';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TapComponent } from '../components/tap/tap';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ArUiPage,
    MorePage,
    SettingsPage,
    TapComponent
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
 AutoCompleteModule,
 FormsModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ArUiPage,
    MorePage,
    SettingsPage,
    TapComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AppAvailability,
    InAppBrowser,
    AngularFireAuth,
    BuildingInfoProvider,
    BuildingInfoProvider,
    
    
   

  ]
})
export class AppModule {}
