
import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection,getDocs,updateDoc } from "firebase/firestore";
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

  /* const firebaseConfigTesting = {
    apiKey: "AIzaSyBFWQm3wVVIHdkxtHR-iV7BDa7gKvxXeOY",
    authDomain: "react-course-testing-c043b.firebaseapp.com",
    projectId: "react-course-testing-c043b",
    storageBucket: "react-course-testing-c043b.appspot.com",
    messagingSenderId: "574420576435",
    appId: "1:574420576435:web:ef9748561794ea96e528c6"
  }; */
/*   if(process.env.NODE_ENV ==='test'){
    //testing
    initializeApp(firebaseConfigTesting);
  }else{
    initializeApp(firebaseConfig);
  }
 */
  
  initializeApp(firebaseConfig);
  const db = getFirestore();
  const googleAuthProvider = new GoogleAuthProvider();

  export{
      db,
      googleAuthProvider,
      doc,
      setDoc,
      collection,
      getDocs,updateDoc
  }