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

/**
   * get all data from firestore
   */

export function queryAllData() {
  let db = firebase.firestore()
  // get all data
  db
    .collection(process.env.REACT_APP_COLLECTION_NAME)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id}: ${doc.data().value}`)
      })
    })
}

/**
 * query data from firestore based on timestamp
 */

export function queryDataByTimestamp(collectionName, startTs, endTs, callback) {
  let db = firebase.firestore()
  const results = []

  db
    .collection(collectionName)
    .where('createdAt', '>=', startTs)
    .where('createdAt', '<=', endTs)
    .orderBy('createdAt')
    .get()
    .then((querySnapshot) => {
      console.log("success to query data by timestamp")
      querySnapshot.forEach((doc) => {
        results.push(doc.data())
      })
      callback(results)
    })
    .catch((err) => {
      console.log("error to query data by timestamp")
      callback(null)
    })
}
