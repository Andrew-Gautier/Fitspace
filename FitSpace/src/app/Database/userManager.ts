import { Component, Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";

import { DATABASE, app } from "src/main";
import { UserData } from "./userData";


@Injectable()
export class UserManager{

  //Path to Users part of realtime database
  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users/";
  
  //Reference to the a map of different users and their data
  dataLoaded : any;//Map<any, any>; 

  //Load a singular User from firebase
  async loadData(dataID : string) : Promise<UserData> {

    var data = await get(ref(DATABASE, 'Users/' + dataID));

    this.dataLoaded.set(dataID, data.toJSON());
    
    var user = this.dataLoaded.get(dataID);

    var userdata = new UserData(
      user.userID,
      user.displayName,
      user.trainerAccount, 
      user.location, 
      user.affilate, 
      user.primaryService
    );

    if (user.likedPosts){
      userdata.likedPosts = user.likedPosts;
    }

    if (user.email){
      userdata.email = user.email;
    }
    
    if (user.admin){
      userdata.admin = user.admin;
    } else {
      userdata.admin = false;
    }

    userdata.bio = user.bio;

    return userdata;
  }

  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A UserData OBJECT!!!
  // async createData(newDataInfo : UserData){ 
  //   console.log("MADE ACCOUNT")
  //   console.log(newDataInfo);
  //   //Update database
  //   await set(ref(DATABASE, "/Users/" + newDataInfo.userID), {
  //     userID : newDataInfo.userID,
  //     displayName : newDataInfo.displayName,
  //     trainerAccount : newDataInfo.trainerAccount,
  //     location : newDataInfo.location,
  //     affilate : newDataInfo.affilate,
  //     primaryService : newDataInfo.primaryService
  //   }).then(() => { 
  //     console.log("Success?");
  //   }).catch(error => {
  //     console.log("There was an error setting data");
  //     console.log(error);
  //   });

  // }


    //Creates a new post and uploads it to firebase, newDataInfo MUST BE A PostData OBJECT!!!
    async createData(newDataInfo : UserData){

      //console.log(newDataInfo);
  
      //Set data in database
      set(ref(DATABASE, "/Users/" + newDataInfo.userID), {
        userID : newDataInfo.userID,
        displayName : newDataInfo.displayName,
        trainerAccount : newDataInfo.trainerAccount,
        location : newDataInfo.location,
        affilate : newDataInfo.affilate,
        primaryService : newDataInfo.primaryService
      });
  
    }

 
  //Updates userdata of dataID with the parameters given
  updateData(newDataInfo : UserData){

    update(ref(DATABASE, "/Users/" + newDataInfo.userID), {
      userID : newDataInfo.userID,
      displayName : newDataInfo.displayName,
      trainerAccount : newDataInfo.trainerAccount,
      location : newDataInfo.location,
      affilate : newDataInfo.affilate,
      primaryService : newDataInfo.primaryService
    });

  }


  updateTrainer(userID : string, trainer : boolean){
    update(ref(DATABASE, "/Users/" + userID), {
      trainerAccount : trainer,
    });
  }

  updateAdmin(userID : string, admin : boolean){
    update(ref(DATABASE, "/Users/" + userID), {
      admin : admin,
    });
  }


  //remove the data that has dataID from the firebase
  removeData(dataID: string){

    const db = getDatabase(app);

    remove(ref(db, "/Users/" + dataID));

    return true;
  }
  

  constructor(){
    this.dataLoaded = new Map();
  }

}