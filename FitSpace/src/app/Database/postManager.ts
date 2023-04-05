import { Component, Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";

import { app } from "src/main";
import { PostData } from "./postData";


@Injectable()
// @Component({
//   template: ''
// })
export class PostManager implements OnInit {

   //Path to Users part of realtime database
  PostsPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Posts/";

  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 100;

   //Reference to the posts stored in database
  dataSnapshot : any; 
  
  //Load a singular piece from firebase (like a user)
  loadData(dataID : string) : PostData {

    var postdata = new PostData(
      this.dataSnapshot[dataID].postID, 
      this.dataSnapshot[dataID].userID, 
      this.dataSnapshot[dataID].username, 
      this.dataSnapshot[dataID].displayName
    );

    return postdata;
  }

  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A PostData OBJECT!!!
  createData(newDataInfo : PostData) : boolean { //Returns true if was a success, false otherwise

    const db = getDatabase(app);

    set(ref(db, "/Posts/" + newDataInfo.postID), {
      postID : newDataInfo.postID,
      userID : newDataInfo.userID,
      username : newDataInfo.username,
      postTitle : newDataInfo.postTitle
    });

    return true;
  }
 

  //Updates the ID associated with the given object to the new PostData object given (Essentially just manupulate on your end)
  updateData(newDataInfo : PostData) : boolean { //Returns true if was a success, false otherwise


    var data: PostData = newDataInfo;

    const db = getDatabase(app);

    update(ref(db, "/Posts/" + data.postID), {
      postTitle : data.postTitle,
      //Need more things to change
    });

    return true;
  }

  //remove the post that has dataID from the firebase
  removeData(dataID: string) : boolean { //Returns true if was a success, false otherwise

    const db = getDatabase(app);

    remove(ref(db, "/Posts/" + dataID));

    return true;
  }

  ngOnInit(): void {

  }

  constructor(){
    //This might be ok for the posts?
    const db = getDatabase();
    const dbRef = ref(db, 'Posts/');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      this.dataSnapshot = data;
    });
  }

}