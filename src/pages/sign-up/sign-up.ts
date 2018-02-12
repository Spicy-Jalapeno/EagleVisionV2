import { Component, OnInit } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@IonicPage({
  name: 'sign-up'
})
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage implements OnInit {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder
  ) {
    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {
    
          let beforeCreateAlert = this.alertCtrl.create({
            message: "Due to the University's Demand in WiFi, we Highly Recommend you turning off your WiFi and using your Mobile Device Service when creating an account.  If you use the University's WiFi your email verification sent link will be very Delayed...Sorry for your inconvenience and enjoy the Vision!",
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          beforeCreateAlert.present();

  }

  // signupUser(): void {
  //   if (!this.signupForm.valid) {
  //     console.log(
  //       `Need to complete the form, current value: ${this.signupForm.value}`
  //     );
  //   } else {
  //     const email: string = this.signupForm.value.email;
  //     const password: string = this.signupForm.value.password;

  //     this.authProvider.signupUser(email, password).then(
  //       user => {
  //         this.loading.dismiss().then(() => {
  //           this.navCtrl.setRoot(HomePage);
  //         });
  //       },
  //       error => {
  //         this.loading.dismiss().then(() => {
  //           const alert: Alert = this.alertCtrl.create({
  //             message: error.message,
  //             buttons: [{ text: 'Ok', role: 'cancel' }]
  //           });
  //           alert.present();
  //         });
  //       }
  //     );
  //     this.loading = this.loadingCtrl.create();
  //     this.loading.present();
  //   }
  // }
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then( () => {
        let afterCreateAlert = this.alertCtrl.create({
          message: "Congratulations on Creating an Account!!! Please check your eagle.fgcu.edu email to find your verification email link.  Once you click the link to verify, you may Login!",
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        afterCreateAlert.present();
      }).then( () => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(LoginPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
