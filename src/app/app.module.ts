import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { PopoverPage } from '../pages/more/popover/popover';
import { TapComponent } from '../components/tap/tap';
import { AppAvailability } from '@ionic-native/app-availability';
import { SettingsPage } from '../pages/settings/settings';
import { ModalPage } from '../pages/settings/modal/modal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2/app';
import { environment } from '../environments/environment'; ////

import { AngularFireModule } from 'angularfire2'; //
import { AngularFireAuthModule } from 'angularfire2/auth'; ///
import { AngularFireDatabaseModule } from 'angularfire2/database';////

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    MorePage,
    PopoverPage, 
    TapComponent,
    SettingsPage,
    ModalPage
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
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    MorePage,
    PopoverPage,
    TapComponent,
    SettingsPage,
    ModalPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AppAvailability,
    InAppBrowser,
    AngularFireAuth,
   

  ]
})
export class AppModule {}
