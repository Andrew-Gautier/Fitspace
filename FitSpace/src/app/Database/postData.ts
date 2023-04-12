//This is what a post object should contain

import { CommentData } from "./commentData";
import { SlideData } from "./slideData";

export class PostData {

  //This needs to correlate with firebase's auth service
  postID : string;

  //User information
  userID : string
  username : string;

  //Whats displayed on the screen
  postTitle : string;

  slides : Array<SlideData>;
  comments : Array<CommentData>;

  likes : Array<string>; //Array of user ids
  date : number;


  //Create a UserData object, contains 
  constructor(id : string, userID: string, username : string, postTitle : string, slides : Array<SlideData>, comments : Array<CommentData> | undefined = undefined, likes : Array<string> | undefined = undefined, date : number | undefined = undefined){
    
    this.postID = id;
    this.userID = userID;
    this.username = username;

    this.postTitle = postTitle;
  
    this.slides = slides;

    if(comments == undefined){
      this.comments = [];
    } else {
      this.comments = comments;
    }
    
    if(likes == undefined){
      this.likes = [];
    } else {
      this.likes = likes;
    }

    if(date == undefined){
      let date = new Date();
      this.date = date.getDate();
    } else {
      this.date = date;
    }


  }

}
