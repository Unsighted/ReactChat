import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyDZb_MY3CONsdORdIeO1kAcWOO9k29EDgk",
    authDomain: "anonychat-2b754.firebaseapp.com",
    projectId: "anonychat-2b754",
    storageBucket: "anonychat-2b754.appspot.com",
    messagingSenderId: "230115774730",
    appId: "1:230115774730:web:305d1c7cff879caf02aaf3",
    measurementId: "G-4C4NVH31VC"
};

  //const FIREBASE_TOKEN = '0h5LTIV8okQZ7CgYIARAAGBESNwF-L9Ir7cLRoou3nYfiz_81NrTDxw04AKrwl6ytysUgml8Fw9mt2g6DrZfMTczsVkbrm2eQEhI'

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();

