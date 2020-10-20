import firebase from 'firebase/app'
import 'firebase/firestore'

export function initializeFirebase() {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  })

  firebase.firestore().enablePersistence()
    .catch(function(err) {
      if (err.code === 'failed-precondition') {
        console.log("failed precondition of firestore")
      } else if(err.code === 'unimplemented') {
        console.log("browser does not support all of the features")
      }
    });
}

