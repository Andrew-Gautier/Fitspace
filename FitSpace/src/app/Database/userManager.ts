import { Component, Injectable, OnInit } from "@angular/core";
import { DatabaseManager } from "./databaseManageInterface";
import { HttpClient } from '@angular/common/http';
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child } from "firebase/database";

import { app } from "src/main";
import { UserData } from "./userData";
//import { UserDataModel } from "./userData.model";
//import { UserInfo } from "firebase/auth";

@Injectable()
@Component({
  template: ''
})
export class UserManager implements OnInit {//DatabaseManager, OnInit {

  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users/";
  //This needs to be implemented to prevent a magic number dependency
  

  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 1;

  // constructor(private http: HttpClient){

  // }

  //Should never load multiple users at once
  // loadDatas(filterArgs : string[]) : Object[] {

  //   throw new Error("Unsupported Method Call");
  // }

  tempdata = undefined;

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
  loadData(dataID : string) : any {
    console.log(1);
    // function myData(data : any) {
    //   //console.log(data)
    //   return data
    // }

    var returnValue = this.loadJSON(this.userPath + dataID + ".json", 'jsonp', this);

    console.log(4);
    console.log(this.tempdata);
    var temp2 = this.tempdata;
  
    this.tempdata = undefined;

    return temp2;
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

    //Explicitly declare the list
    //var data: Object = Object;

    //Use DataID to get post, and update it
    //Explicitly declare the list
    var data: UserData = newDataInfo;

    //this.http.get()
    //this.http.post()
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

    //var data: Object = Object;

    const db = getDatabase(app);

    remove(ref(db, "/Users/" + dataID));

    return true;
  }

  ngOnInit(): void {

  }


}