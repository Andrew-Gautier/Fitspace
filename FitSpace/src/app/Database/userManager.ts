import { Component, Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";

import { app } from "src/main";
import { UserData } from "./userData";


@Injectable()
// @Component({
//   template: ''
// })
export class UserManager implements OnInit {

  //Path to Users part of realtime database
  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users/";
  
  //Reference to the users snapshot data (This needs to be updated to just 1 user's snapshot)
  dataSnapshot : any; 

  //Load a singular User from firebase
  loadData(dataID : string) : UserData {
    
    var userdata = new UserData(
      this.dataSnapshot[dataID].userID,
      this.dataSnapshot[dataID].displayName,
      this.dataSnapshot[dataID].trainerAccount, 
      this.dataSnapshot[dataID].location, 
      this.dataSnapshot[dataID].affilate, 
      this.dataSnapshot[dataID].primaryService
    );

    return userdata;
  }

  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A UserData OBJECT!!!
  createData(newDataInfo : UserData) : boolean { //Returns true if was a success (theoretically would return false if it fails, but theres not fail state)

    const db = getDatabase(app);

    set(ref(db, "/Users/" + newDataInfo.userID), {
      userID : newDataInfo.userID,
      displayName : newDataInfo.displayName,
      trainerAccount : newDataInfo.trainerAccount,
      location : newDataInfo.location,
      affilate : newDataInfo.affilate,
      primaryService : newDataInfo.primaryService
    });

    return true;
  }
 
  //Updates userdata to the new userdata object given
  updateData(newDataInfo : UserData) : boolean { //Returns true if was a success, false otherwise

    const db = getDatabase(app);

    update(ref(db, "/Users/" + newDataInfo.userID), {
      userID : newDataInfo.userID,
      displayName : newDataInfo.displayName,
      trainerAccount : newDataInfo.trainerAccount,
      location : newDataInfo.location,
      affilate : newDataInfo.affilate,
      primaryService : newDataInfo.primaryService
    });

    return true;
  }

  //remove the data that has dataID from the firebase
  removeData(dataID: string) : boolean { //Returns true if was a success, false otherwise

    const db = getDatabase(app);

    remove(ref(db, "/Users/" + dataID));

    return true;
  }

  ngOnInit(): void {

  }

  constructor(){
    //This is bad, change to on startup, get you user information, then subscribe to other users as needed
    const db = getDatabase();
    const dbRef = ref(db, 'Users/');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      this.dataSnapshot = data;
    });
  }

}