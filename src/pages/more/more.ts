import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Alert, AlertController, IonicPage, Loading, LoadingController, Platform, Nav, ActionSheetController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as moment from 'moment';
import firebase from 'firebase';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage implements OnInit {
  private todaysDate: any;
  private dbRef: firebase.database.Reference;
  private convertedTodaysDate: any;
  private count = 0;
  private view: any;
  private mockUrl = "https://fgcu.instructure.com/login/oauth2/token"
  private jsonString: any
  public url: string;
  public code: any = '';
  public code2: string;
  public masterUrl: string;
  public craps: any;
  public showMe: String = "";
  public crap2: any;
  public access_token: any = '';
  public refresh_token: any = '';
  public jsonArr: Array<any> = [];
  public userDataActive: Array<any> = [];
  public userDataInactive: Array<any> = [];
  public showGraphic: any = 1;
  public showGraphic2: any = 1;
  public showCanvasGraphic: any = 1;
  public showCanvasGraphicImg: any = 1;
  public endAnimation: any = 1;
  public userId: any;
  public courseID: Array<any> = [];
  public courseIDOrdered: Array<any> = [];
  public grades: Array<any> = [];
  public userEnrollments: Array<any> = [];
  public userCourses: Array<any> = [];
  public allAssignmentsArr: Array<any> = [];
  public authKey: any;
  public user: any;
  constructor(public navCtrl: NavController, private http: HTTP, private authProvider: AuthProvider, private InAppBrowser: InAppBrowser, public alertCtrl: AlertController, private https: HttpClient, private nativePageTransitions: NativePageTransitions) {
    this.user = firebase.auth().currentUser.uid;
    this.todaysDate = moment();
    this.convertedTodaysDate = moment(this.todaysDate).format("MM-DD-YYYY");
    console.log(this.convertedTodaysDate)
    setTimeout(() => {
      this.showGraphic = 3
      this.authKey = firebase.auth().currentUser;
      console.log(this.authKey.uid)
    }, 1000)
    setTimeout(() => {
      this.showGraphic = 1
      this.showGraphic2 = 3
    }, 4000)
    setTimeout(() => {
      this.showGraphic = 1
      this.showGraphic2 = 1
      this.showCanvasGraphic = 3
    }, 7000)
    setTimeout(() => {
      this.showGraphic = 1
      this.showGraphic2 = 1
      this.showCanvasGraphicImg = 3
    }, 10000)
    setTimeout(() => {
      this.getToken().then((token) => {
        this.getCourses(token).then((activeCourses) => {
          this.getGrades(activeCourses).then((courses) => {
            this.getAssignments(courses);
          })
        })
      })
    }, 13000)
    this.plusOneGlobal();
    this.plusOneUser();
    setTimeout(() => {
     this.navCtrl.setRoot(HomePage);
    }, 14000)
    
  }
  ngOnInit() {
    this.view = this.navCtrl.getActive().name;
    console.log(this.view)
  }
  //Function To Log Out A User From The Eagle Vision App
  logOut() {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('login');
    });
  }
  plusOneUser(): void {
    this.count = this.count + 1;
    firebase.database().ref(`users/${this.user}/user_analytics/home/${this.convertedTodaysDate}`).transaction(eventSnapshot => {
      console.log(eventSnapshot);
      console.log(eventSnapshot + 1);
      eventSnapshot += 1;
      console.log("count", this.count)
      return eventSnapshot;
    }).then(() => {
      firebase.database().ref(`users/${this.user}/user_analytics/home_total`).transaction(eventSnapshot2 => {
        eventSnapshot2 += 1;
        return eventSnapshot2;
      });
    })
  }
  plusOneGlobal(): void {
    this.count = this.count + 1;
    firebase.database().ref(`campus_data/usage_analytics/home_visits/${this.convertedTodaysDate}`).transaction(eventSnapshot => {
      console.log(eventSnapshot);
      console.log(eventSnapshot + 1);
      eventSnapshot += 1;
      console.log("count", this.count)
      return eventSnapshot;
    }).then(() => {
      firebase.database().ref(`campus_data/usage_analytics/home_total_visits`).transaction(eventSnapshot2 => {
        eventSnapshot2 += 1;
        return eventSnapshot2;
      });
    })
  }
  getToken() {
    this.url = "http://fgcu.instructure.com/login/oauth2/auth?client_id=10510000000000132&response_type=code&redirect_uri=https://fgcu.instructure.com/api/v1/courses?per_page=100"
    const browser = this.InAppBrowser.create(this.url, '_blank');
    browser.on('loadstart').subscribe((ev) => {
      if (ev.url.toString().startsWith("https://fgcu.instructure.com/api/v1/courses?per_page=100&code=")) {
        this.code = ev.url.substring(62, ev.url.length);
        browser.close()
      }
    })
    return new Promise(resolve => {
      browser.on('exit').subscribe((ev) => {
        let header1 = { "Content-Type": "application/x-www-form-urlencoded" }
        let body1 = '';
        this.http.post('https://fgcu.instructure.com/login/oauth2/token?grant_type=authorization_code&client_id=10510000000000132&client_secret=vssLZlvY3Yx0hXkaUdRHTebKTRjf2rRhtmNmcH24eEQjXA142QdktelGFHEezx0Y&redirect_uri=https://fgcu.instructure.com/&code=' + this.code, body1, header1)
          .then(response => {
            let jsonRes = JSON.parse(response.data)
            this.userId = jsonRes.user.id
            this.jsonString = response.data.toString();
            this.access_token = this.jsonString.substring(17, 86);
            this.refresh_token = this.jsonString.substring(205, 274)
            resolve(this.access_token);
            firebase.database().ref(`users/${this.user}/user_profile/auth_tokens/`).transaction(() => {
              return {
                access_token: this.access_token,
                refresh_token: this.refresh_token
              }
            }).catch(error => {
              firebase.database().ref(`users/${this.user}/user_profile/auth_tokens/`).transaction(() => {
                return error;
              })
            })
            //For Animations
            this.showCanvasGraphic = 1;
            this.showCanvasGraphicImg = 1;
            this.endAnimation = 3;
          })
      })
    })
  }
  getCourses(token) {
    return new Promise(resolve => {
      let body = '';
      let headers = '';
      let userData;
      this.http.get(`https://fgcu.instructure.com/api/v1/courses?per_page=100&access_token=${token}`, body, headers)
        .then(response => {
          userData = response.data;
          let json = JSON.parse(userData)
          if (this.jsonArr.length === 0) {
            this.jsonArr = [...json];
          } else {
            this.userDataActive = [];
            this.userDataInactive = [];
            this.jsonArr = [];
            this.jsonArr = [...json];
          }
          for (var i = 0; i < this.jsonArr.length; i++) {
            if (this.jsonArr[i].start_at) {
              let timeHold = moment.parseZone(this.jsonArr[i].start_at).format('YYYY-MM-DD')
              if (moment(timeHold).isAfter('2018-01-01', 'day')) {
                this.userDataActive.push(this.jsonArr[i])
                this.userCourses.push(this.jsonArr[i].id)
              } else {
                //Do nothing
              }
            }
          }
          resolve(this.userDataActive)
          firebase.database().ref(`users/${this.user}/user_profile/user_courses`).transaction(() => {
            return this.userDataActive
          }).catch(error => {
            firebase.database().ref(`users/${this.user}/user_profile/user_courses`).transaction(() => {
              return error;
            })
          })
        }).catch(error => {
          alert("Network Error 1")
        })
    })
  }
  getGrades(courses) {
    return new Promise(resolve => {
      let body = '';
      let headers = '';
      this.http.get(`https://fgcu.instructure.com/api/v1/users/${this.userId}/enrollments?access_token=${this.access_token}`, body, headers)
        .then(response => {
          let json = JSON.parse(response.data)
          if (this.jsonArr.length === 0) {
            this.jsonArr = [...json];
          } else {
            this.jsonArr = [];
            this.jsonArr = [...json];
          }
          for (var i = 0; i < this.jsonArr.length; i++) {
            for (var j = 0; j < courses.length; j++) {
              if (this.jsonArr[i].course_id === courses[j].id) {
                this.grades.push({
                  "current_score": this.jsonArr[i].grades.current_score,
                  "course_name": courses[j].name,
                })
              }
            }
          }
          resolve(courses)
          firebase.database().ref(`users/${this.user}/user_profile/user_grades`).transaction(() => {
            return this.grades
          }).catch(error => {
            firebase.database().ref(`users/${this.user}/user_profile/user_grades`).transaction(() => {
              return error
            })
          })
        })
    })
  }
  getAssignments(courses) {
    return new Promise(resolve => {
      this.jsonArr = [];
      let body = '';
      let headers = '';
      this.http.get(`https://fgcu.instructure.com/api/v1/courses/${courses[0].id}/assignments?per_page=100&access_token=${this.access_token}`, body, headers)
        .then(response => { 
          firebase.database().ref(`users/${this.user}/user_profile/user_assignments`).transaction(() => {
            return JSON.parse(response.data)
          }).catch(error => {
            firebase.database().ref(`users/${this.user}/user_profile/user_assignments`).transaction(() => {
              return error
            })
          })
        })
    })
  }
}