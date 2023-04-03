import { Component, Injectable, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";

import { app } from "src/main";
import { UserData } from "./userData";


@Injectable()
@Component({
  template: ''
})
export class UserManager implements OnInit {//DatabaseManager, OnInit {

  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users/";
  //This needs to be implemented to prevent a magic number dependency
  
  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 1;

  dataSnapshot : any; 

  loadJSON(path : string, error : string, self : any) : any{
    console.log(2);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (self : any) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(JSON.parse(xhr.responseText));
          //console.log(3);
          self.tempdata = JSON.parse(xhr.responseText);
        }
        else {
          //Bad error handling but im done with this
          console.log(error);
        }
      }
    };
    xhr.open('GET', path, false);
    xhr.send();
  }
  
  //Load a singular piece from firebase (like a user)
  loadData(dataID : string) : UserData {

    //if(this.dataSnapshot[dataID] != null){
    var userdata = new UserData(this.dataSnapshot[dataID].userID, this.dataSnapshot[dataID].displayName, this.dataSnapshot[dataID].trainerAccount, this.dataSnapshot[dataID].location, this.dataSnapshot[dataID].affilate, this.dataSnapshot[dataID].primaryService);


    return userdata;
  }


  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A UserData OBJECT!!!
  createData(newDataInfo : UserData) : boolean { //Returns true if was a success, false otherwise

    //Explicitly declare the list
    var data: UserData = newDataInfo;


    const db = getDatabase(app);

    set(ref(db, "/Users/" + data.userID), {
      userID : data.userID,
      displayName : data.displayName,
      trainerAccount : data.trainerAccount,
      location : data.location,
      affilate : data.affilate,
      primaryService : data.primaryService
    });

    return true;
  }
 

  //updates the data that has dataID with the newDataInfo
  //To properly update a user, manupulate the user opject on your own end
  updateData(newDataInfo : UserData) : boolean { //Returns true if was a success, false otherwise

    var data: UserData = newDataInfo;

    const db = getDatabase(app);

    update(ref(db, "/Users/" + data.userID), {
      //userID : data.userID,
      displayName : data.displayName,
      trainerAccount : data.trainerAccount,
      location : data.location,
      affilate : data.affilate,
      primaryService : data.primaryService
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