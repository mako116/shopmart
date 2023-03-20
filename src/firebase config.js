 import { initializeApp } from "firebase/app";
 import {getAuth} from 'firebase/auth'
 import {getFirestore} from 'firebase/firestore'
 import{getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCRi7AxmEzHx1DAMmk4YJ4Zn_ale8uvc-g",
  authDomain: "maltimart2-3a5d2.firebaseapp.com",
  projectId: "maltimart2-3a5d2",
  storageBucket: "maltimart2-3a5d2.appspot.com",
  messagingSenderId: "1003304039130",
  appId: "1:1003304039130:web:c3bfc66ff84757a5d66be3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
export  const storage = getStorage(app)
export default app