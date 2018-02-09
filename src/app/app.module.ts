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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ArUiPage,
    MorePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { 
      mode: "md"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ArUiPage,
    MorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  ]
})
export class AppModule {}
