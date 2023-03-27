import { Component, OnInit } from "@angular/core";
import { DatabaseManager } from "./databaseManageInterface";
import { HttpClient } from '@angular/common/http';
import * as firebase from "firebase/compat";
import { getDatabase, ref, set } from "firebase/database";
//import { Data } from "./databaseManageInterface";
// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need


//FIREBASE SETUP
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// const app = initializeApp();
// const auth = getAuth(app);
// const db = getFirestore();

// export { auth, db };

//implements Data
export class UserData {
  info: string | undefined;
  link: string | undefined;
}


@Component({
  template: ''
})
export class UserManager implements DatabaseManager, OnInit {

  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users.json";
  //This needs to be implemented to prevent a magic number dependency
  

  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 1;

  // constructor(private http: HttpClient){

  // }

  //Should never load multiple users at once
  loadDatas(filterArgs : string[]) : Object[] {

    throw new Error("Unsupported Method Call");
  }

  
  //func loadData 
  //Load a singular piece from firebase (like a user)
//  (dataID : string) : data;
  loadData(dataID : string) : Object {

    //Explicitly declare the list
    var data: Object = Object;

    //Use DataID to get post

    return data;
  }

  //func createData( listOfDataParameters, userID):
  //Creates a new post and uploads it to firebase
  createData(newDataInfo : Object) : boolean { //Returns true if was a success, false otherwise

    //Explicitly declare the list
    var data: Object = Object;

    //this.http.get()
    //this.http.post()
    const db = getDatabase(app);
    set(ref(db, "/Users/Test"), {
      username: "Kyle Mult Sleen",
      desc: "test user",
      account: 987
    });

    //Use DataID to get post

    return true;
  }
 
  //func updatePost( postID, listOfPostChanges):
  //updates the data that has dataID with the newDataInfo
//  ( dataID : string, newDataInfo : data) : void
  updateData(dataID: string, newDataInfo : Object) : boolean { //Returns true if was a success, false otherwise

    //Explicitly declare the list
    var data: Object = Object;

    //Use DataID to get post, and update it

    return true;
  }

  //func deleteData
  //remove the data that has dataID from the firebase
  removeData(dataID: string) : boolean { //Returns true if was a success, false otherwise

    var data: Object = Object;

    //Use DataID to get post, and remove it

    return true;
  }

  ngOnInit(): void {
    // Import Admin SDK
   // const { getDatabase } = require('firebase-admin/database');

    // Get a database reference to our blog
  //  const db = getDatabase();
  // const ref = db.ref('server/saving-data/fireblog');
  }
}