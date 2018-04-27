import { Component, ViewChild } from '@angular/core';
import {Slides,Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { MorePage } from '../more/more';

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "eagle.fgcu.edu") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null;
 }

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;
  public signupForm: FormGroup;
 
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid, emailDomainValidator])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });


    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid, emailDomainValidator])
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      dob:[
        '',
        Validators.compose([Validators.required])
      ],
      gender:[
        '',
        Validators.compose([Validators.required])
      ],
      major: [
        '',
        Validators.compose([Validators.required])
      ],
      expected: [
        '',
        Validators.compose([Validators.required])
      ],
      transfer:[
        
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  goToLogin() {
    this.slider.slideTo(1);
  }

  goToSignup(): void {
    // this.navCtrl.push('sign-up');
    this.slider.slideTo(2);
  }

  goToResetPassword(): void {
    this.navCtrl.push('reset-password');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.signupForm.value}`
      );
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;
      const dob: string = this.signupForm.value.dob;
      const gender:string = this.signupForm.value.gender;
      const major:string = this.signupForm.value.major;
      const expected:string = this.signupForm.value.expected;
      const transfer:string = this.signupForm.value.transfer;
      console.log("This is the date of birth " + dob);
      console.log("This is the Gender " + gender);
      console.log('this is the major '+ major);
      console.log('this is the year '+ expected);
      console.log('this is the transfer '+transfer);
      this.authProvider.signupUser(email, password).then(
        user => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(MorePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
