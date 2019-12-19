import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDVG5IJMvIdC2NXOaKEev7F-_eEi4__LME",
    authDomain: "halisaham-itu.firebaseapp.com",
    databaseURL: "https://halisaham-itu.firebaseio.com",
    projectId: "halisaham-itu",
    storageBucket: "halisaham-itu.appspot.com",
    messagingSenderId: "15724569321",
    appId: "1:15724569321:web:a0eeadc1e235f596584678"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();