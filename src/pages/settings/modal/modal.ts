import {Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
    selector:'page-modal',
    template: `
    <ion-content class="main-view">
  <div class="overlay" (click)="dismiss()"></div>
  <div class="modal_content">
    <b>Office of Admission (Howard Hall) </b>
    <a ion-label class="num1" href="tel: +239-590-7878">(239) 590-7878</a> 
    <a ion-label class="num2" href="tel: +888-889-1095">(888) 889-1095</a> 
    <a href="mailto:admissions@fgcu.edu" data-rel="external">admissions@fgcu.edu</a>

   <img src='assets/imgs/Howard.png'>
   
    
  </div>
</ion-content>`,
})

export class ModalPage{
    
    constructor(private viewCtrl: ViewController){

    }



    onAction(action: string){
        this.viewCtrl.dismiss({action: action});
    }
    dismiss() {
        this.viewCtrl.dismiss();
      }
    

}