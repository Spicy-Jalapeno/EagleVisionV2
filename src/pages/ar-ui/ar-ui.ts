import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ActionSheetController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-ar-ui',
  templateUrl: 'ar-ui.html',
  
})

export class ArUiPage implements OnDestroy {
@ViewChild(Nav) nav:Nav;
  public toggoleShowHide = false;
  
  constructor(
    public platform: Platform,
   // public nav: Nav,
    public actionsheetCtrl: ActionSheetController,
    private cameraPreview: CameraPreview) { 

      this.platform.ready().then(()=> {
        let options = {
          x: 0,
          y: 0,
          width: window.screen.width,
          height: window.screen.height,
          camera: 'rear',
          tapPhoto: true,
          previewDrag: false,
          toBack: true,
        }
        this.cameraPreview.startCamera(options).then(
          (res)=> {
            console.log(res)
          },
          (err) => {
            console.log(err)
          });
      })

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  ngOnDestroy(){
    this.cameraPreview.stopCamera();
  }

  goHome(){
    this.nav.setRoot(HomePage)
  }

  displayUI(){
    this.toggoleShowHide = !this.toggoleShowHide;
  }

}
