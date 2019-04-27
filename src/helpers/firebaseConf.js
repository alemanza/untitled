import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAOGCP6RLpERoEIt1MpbShOaZN473o0GU8",
  authDomain: "untitled-ff35f.firebaseapp.com",
  databaseURL: "https://untitled-ff35f.firebaseio.com",
  projectId: "untitled-ff35f",
  storageBucket: "untitled-ff35f.appspot.com",
  messagingSenderId: "588362429171"
}

firebase.initializeApp(config);

const database = firebase.firestore()

export const Auth = firebase.auth()

export const DB = database