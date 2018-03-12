import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  onClickCard(id:number, myEvent){
      switch(id){
         case 1: {
          let popover = this.modalCtrl.create(PopoverPage)
          popover.present({
            //ev:myEvent
          });
          break;
         }
      }
  }
}
