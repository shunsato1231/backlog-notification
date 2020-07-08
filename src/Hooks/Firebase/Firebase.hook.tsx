import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/database'

interface Config {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export type FirebaseConfig = Required<Config>

export const useFirebase = (configuration?: FirebaseConfig) => {
  let config = configuration || {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_SENDER_ID
  }

  !firebase.apps.length
    ? firebase.initializeApp({ ...config })
    : firebase.app();

  let messaging = firebase.messaging.isSupported()
    ? firebase.messaging()
    : null

  return {
    auth: firebase.auth(),
    database: firebase.firestore(),
    messaging: messaging,
  }
}