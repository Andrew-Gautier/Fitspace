import { Component, Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";

import { DATABASE, app } from "src/main";
import { UserData } from "./userData";


@Injectable()
// @Component({
//   template: ''
// })
export class UserManager implements OnInit {

  //Path to Users part of realtime database
  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users/";
  
  //Reference to the a map of different users and their data
  dataLoaded : any;//Map<any, any>; 

  //Load a singular User from firebase
  async loadData(dataID : string) : Promise<UserData> {

    var data = await get(ref(DATABASE, 'Users/' + dataID));

    this.dataLoaded.set(dataID, data.toJSON());

    // console.log(this.dataLoaded);
    // console.log(this.dataLoaded.has(dataID));
    // console.log(this.dataLoaded.get(dataID));
    // console.log(this.dataLoaded.keys().next());

    
    var user = this.dataLoaded.get(dataID);

    var userdata = new UserData(
      user.userID,
      user.displayName,
      user.trainerAccount, 
      user.location, 
      user.affilate, 
      user.primaryService
    );

    return userdata;
  }

  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A UserData OBJECT!!!
  createData(newDataInfo : UserData) : boolean { //Returns true if was a success (theoretically would return false if it fails, but theres not fail state)

    set(ref(DATABASE, "/Users/" + newDataInfo.userID), {
      userID : newDataInfo.userID,
      displayName : newDataInfo.displayName,
      trainerAccount : newDataInfo.trainerAccount,
      location : newDataInfo.location,
      affilate : newDataInfo.affilate,
      primaryService : newDataInfo.primaryService
    });

    return true;

  }
 
  //Updates userdata of dataID with the parameters given
  updateData(newDataInfo : UserData) : boolean { //Returns true if was a success, false otherwise

    //const db = getDatabase(app);
 //   const 

    update(ref(DATABASE, "/Users/" + newDataInfo.userID), {
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
    this.dataLoaded = new Map();

  }

}