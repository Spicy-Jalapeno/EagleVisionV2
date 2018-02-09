import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


@IonicPage({
  name: 'reset-password'
})
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})

export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController, public alertCtrl: AlertController,
    public formBuilder: FormBuilder, public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });

  }

  // resetPassword(): void {
  //   if (!this.resetPasswordForm.valid) {
  //     console.log(
  //       `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
  //     );
  //   } else {
  //     const email: string = this.resetPasswordForm.value.email;
  //     this.authProvider.resetPassword(email).then(
  //       user => {
  //         const alert: Alert = this.alertCtrl.create({
  //           message: 'Check your email for a password reset link',
  //           buttons: [
  //             {
  //               text: 'Ok',
  //               role: 'cancel',
  //               handler: () => {
  //                 this.navCtrl.pop();
  //               }
  //             }
  //           ]
  //         });
  //         alert.present();
  //       },
  //       error => {
  //         const errorAlert = this.alertCtrl.create({
  //           message: error.message,
  //           buttons: [{ text: 'Ok', role: 'cancel' }]
  //         });
  //         errorAlert.present();
  //       }
  //     );
  //   }
  // }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      this.authProvider.resetPassword(this.resetPasswordForm.value.email)
        .then((user) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: "We just sent you a reset link to your email",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            alert.present();
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            let errorAlert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [{ text: "Ok", role: 'cancel' }]
            });
            errorAlert.present();
          });
        });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
