import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfOXcAMPMc9jSgWIthS2OyghlNylmrfV4",
  authDomain: "collab-3e1b7.firebaseapp.com",
  databaseURL: "https://collab-3e1b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "collab-3e1b7",
  storageBucket: "collab-3e1b7.appspot.com",
  messagingSenderId: "511546369262",
  appId: "1:511546369262:web:93162563246aa08e547fff"
};

if(firebase.app.length === 1) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
const storage = getStorage();

export { db,storage };