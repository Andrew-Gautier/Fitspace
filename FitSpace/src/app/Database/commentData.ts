//This is what a post object should contain

import { OnInit } from "@angular/core";
import { USER_MANAGER } from "src/main";

export class CommentData {

  userID : string;
  username : string;
  textData : string;

  //Create a UserData object, contains 
  constructor(userID : string, textData : string, username : string){
    this.userID = userID;
    this.textData = textData;
    this.username = username;
  }



}