// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,getDoc,doc,setDoc} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR1Z2y2PXmfDko_QnU01wqgPfNMpfr9rk",
  authDomain: "financly-app-b430f.firebaseapp.com",
  projectId: "financly-app-b430f",
  storageBucket: "financly-app-b430f.appspot.com",
  messagingSenderId: "476850423370",
  appId: "1:476850423370:web:ab0b7c2d681773055648b3",
  measurementId: "G-4W954522L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
const imageDb=getStorage(app);
export {db,auth,provider,doc,setDoc,imageDb}


