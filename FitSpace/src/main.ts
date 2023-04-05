import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { HttpClientModule } from '@angular/common/http';

//FIREBASE SETUP
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { UserManager } from './app/Database/userManager';
import { PostManager } from './app/Database/postManager';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxQoHghtp_Imm2EmfRFbK8InLD17cphgg",
  authDomain: "fitspace-ba5a9.firebaseapp.com",
  databaseURL: "https://fitspace-ba5a9-default-rtdb.firebaseio.com",
  projectId: "fitspace-ba5a9",
  storageBucket: "fitspace-ba5a9.appspot.com",
  messagingSenderId: "413802128221",
  appId: "1:413802128221:web:ccf7babda4a74c52a87eb4",
  measurementId: "G-GYLDGET2YB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

//The code above sets up firebase for the entire app

//Create a database manager for userManager
export const USER_MANAGER = new UserManager();
export const POST_MANAGER = new PostManager();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
