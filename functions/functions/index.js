/*
 *   These Firebase Functions run on Firebase's Cloud server so they do not affect the app when
 *   A user creates a new account.  The more we can run on the server the faster our
 *   App will run
*/

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.userAnalyticsNode = functions.auth.user().onCreate(event => {

    //FireBase Cloud Function to create user analaytics node when user creates an account
    admin.database().ref(`users/${event.data.uid}/user_analytics`).set({
        email: event.data.email,
        uid: event.data.uid
    })

});