import { Component, Injectable, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue } from "firebase/database";

import { app } from "src/main";
//import { UserData } from "./userData";
import { PostData } from "./postData";


@Injectable()
@Component({
  template: ''
})
export class PostManager implements OnInit {//DatabaseManager, OnInit {

  PostsPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Posts/";
  //This needs to be implemented to prevent a magic number dependency
  

  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 100;

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
  loadData(dataID : string) : PostData {

    var postdata = new PostData(this.dataSnapshot[dataID].postID, this.dataSnapshot[dataID].userID, this.dataSnapshot[dataID].username, this.dataSnapshot[dataID].displayName);

    return postdata;
  }


  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A UserData OBJECT!!!
  createData(newDataInfo : PostData) : boolean { //Returns true if was a success, false otherwise

    //Explicitly declare the list
    var data: PostData = newDataInfo;


    const db = getDatabase(app);

    set(ref(db, "/Posts/" + data.postID), {
      postID : data.postID,
      userID : data.userID,
      username : data.username,
      postTitle : data.postTitle
    });

    return true;
  }
 

  //updates the data that has dataID with the newDataInfo
  //To properly update a user, manupulate the user opject on your own end
  updateData(newDataInfo : PostData) : boolean { //Returns true if was a success, false otherwise


    var data: PostData = newDataInfo;

    const db = getDatabase(app);

    update(ref(db, "/Posts/" + data.postID), {

      postTitle : data.postTitle,
    });


    return true;
  }

  //remove the data that has dataID from the firebase
  removeData(dataID: string) : boolean { //Returns true if was a success, false otherwise

    //var data: Object = Object;

    const db = getDatabase(app);

    remove(ref(db, "/Posts/" + dataID));

    return true;
  }

  ngOnInit(): void {

  }

  constructor(){
    const db = getDatabase();
    const dbRef = ref(db, 'Users/');

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      this.dataSnapshot = data;
    });
  }

}