import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
  public user: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public formBuilder: FormBuilder,
    public authProvider: AuthProvider) {

    this.loginForm = formBuilder.group({

      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]

    });
  }

  //Function That Navigates User To Sign-Up Page And Sign-Up For Eagle Vision App Account
  goToSignup(): void {
    this.navCtrl.push('sign-up');
  }

  //Function That Navigates User To Reset Password Page And Allows User To 
  //Reset Password For Eagle Vision App Account
  goToResetPassword(): void {
    this.navCtrl.push('reset-password');
  }

  //Function that Allows User to Login To Their Eagle Vision App Account But Checks First
  //If They Have Verified Their Email Address With Verification Email Link
  loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          this.loading.dismiss().then(() => {
            console.log("Verified", authData.emailVerified)
            if (authData.emailVerified === false) {
              let verAlert = this.alertCtrl.create({
                message: "Please Check Your Email For Sent Verification Link Before Logging In",
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              verAlert.present();
            } else if (authData.emailVerified === true) {
              this.navCtrl.setRoot(HomePage);
            }
          });
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
