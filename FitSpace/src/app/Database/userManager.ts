/**
 * @author Zachary Spiggle
 * @date 3/27/23
 * 
 * This object operates as an interface between client and the server for User content
 */

import { Component, Injectable, OnInit } from "@angular/core";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";
import { DATABASE, app } from "src/main";
import { UserData } from "./userData";


@Injectable()
export class UserManager{

  //Path to Users part of realtime database
  userPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Users/";
  
  //Reference to the a map of different users and their data
  dataLoaded : any;

  /**
   * Asynchronous method to load a specified user Data object that contains information about a single user
   * 
   * @param dataID The ID of the user object we want
   * @returns A promise for the UserData object of the user that has the same ID as our parameter
   */
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

    if (user.bio){
      userdata.bio = user.bio;
    } else {
      userdata.bio = "";
    }

    return userdata;
  }

  /**
   * A method to create data in the firebase realtime database for a new user
   * 
   * @param newDataInfo A UserData object that contains the information about the post to store in the database
   */
  async createData(newDataInfo : UserData){

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

  /**
   * Update the Trainer status for a user stored in the database
   * 
   * @param userID The user ID to update the trainer status of
   * @param trainer A boolean that describes the trainer status of the user
   */
  updateTrainer(userID : string, trainer : boolean){
    update(ref(DATABASE, "/Users/" + userID), {
      trainerAccount : trainer,
    });
  }

    /**
   * Update the Trainer status for a user stored in the database
   * 
   * @param userID The user ID to update the trainer status of
   * @param admin A boolean that describes the admin status of the user
   */
  updateAdmin(userID : string, admin : boolean){
    update(ref(DATABASE, "/Users/" + userID), {
      admin : admin,
    });
  }

  constructor(){
    this.dataLoaded = new Map();
  }


  /**
   * Update the display name for a user
   * 
   * @param userID The user ID of the user to update
   * @param newName A string of the new name to update the current display name to
   */
  updateDisplayname(userID : string, newName : string){
    update(ref(DATABASE, "/Users/" + userID), {
      displayName : newName
    });
  }

  /**
   * Update the email for a user
   * 
   * @param userID The user ID of the user to update
   * @param newName A string of the new email to update the current email to
   */
  updateEmail(userID : string, newName : string){
    update(ref(DATABASE, "/Users/" + userID), {
      email : newName
    });
  }

  /**
   * Update the affliate for a user
   * 
   * @param userID The user ID of the user to update
   * @param newName A string of the new affliate to update the current affliate to
   */
  updateAffliate(userID : string, newName : string){
    update(ref(DATABASE, "/Users/" + userID), {
      affilate : newName
    });
  }

  /**
   * Update the service for a user
   * 
   * @param userID The user ID of the user to update
   * @param newName A string of the new service to update the current service to
   */
  updateService(userID : string, newName : string){
    update(ref(DATABASE, "/Users/" + userID), {
      primaryService : newName
    });
  }

  /**
   * Update the location for a user
   * 
   * @param userID The user ID of the user to update
   * @param newName A string of the new location to update the current location to
   */
  updateLocation(userID : string, newName : string){
    update(ref(DATABASE, "/Users/" + userID), {
      location : newName
    });
  }

    /**
   * Update the bio for a user
   * 
   * @param userID The user ID of the user to update
   * @param newName A string of the new bio to update the current bio to
   */
  updateBio(userID : string, newBio : string){
    update(ref(DATABASE, "/Users/" + userID), {
      bio : newBio
    });
  }
}