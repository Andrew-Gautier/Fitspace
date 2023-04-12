import { Component, Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase/compat";
import { getDatabase, get, ref, remove, set, update, child, onValue, query, limitToLast } from "firebase/database";

import { DATABASE, app } from "src/main";
import { PostData } from "./postData";
import { CommentData } from "./commentData";


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

  dataLoaded : any;

  //Unimplemented
  async loadAllPosts(): Promise<Array<PostData>>{

    var posts = new Array();

    //const recentPostsRef = query(ref(DATABASE, 'Posts/'), limitToLast(this.max_count));
    //var jsonPosts = recentPostsRef.toJSON();
   
    //get list of objects from jsonPosts to post objects
    //posts = jsonPosts
    //console.log(jsonPosts);

    var data = await get(ref(DATABASE, 'Posts'));
    data.forEach( child => {
      //child.val();
      posts.push(child.val());
    })

    //var jsondata = data.toJSON();
    //console.log(posts);

    return posts;
  }
  
  //Load a singular piece from firebase (like a user)
  async loadData(dataID : string) : Promise<PostData> {

    var data = await get(ref(DATABASE, 'Posts/' + dataID));

    this.dataLoaded.set(dataID, data.toJSON());

    // console.log(this.dataLoaded);
    //  console.log(this.dataLoaded.has(dataID));
    //  console.log(this.dataLoaded.get(dataID));
    // console.log(this.dataLoaded.keys().next());

    var post = this.dataLoaded.get(dataID);

    var postdata = new PostData(
      post.postID, 
      post.userID, 
      post.username, 
      post.displayName,
      post.postSlides,
    );

    if(post.comments != null){
      postdata.comments = Object.values(post.comments);
    } 

    if(post.likes != null){
      postdata.likes = Object.values(post.likes);
    } 

    if(post.date != null){
      postdata.date = post.date;
    } 


    // var postdata = new PostData(
    //   this.dataSnapshot[dataID].postID, 
    //   this.dataSnapshot[dataID].userID, 
    //   this.dataSnapshot[dataID].username, 
    //   this.dataSnapshot[dataID].displayName
    // );

    return postdata;
  }

  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A PostData OBJECT!!!
  createData(newDataInfo : PostData) : boolean { //Returns true if was a success, false otherwise

    console.log(newDataInfo);
    const db = getDatabase(app);

    set(ref(db, "/Posts/" + newDataInfo.postID), {
      postID : newDataInfo.postID,
      userID : newDataInfo.userID,
      username : newDataInfo.username,
      postTitle : newDataInfo.postTitle,
      postSlides : newDataInfo.slides,
      comments : []// newDataInfo.comments
    });



    // update(ref(db, "/Posts/" + newDataInfo.postID), {
    //   postSlides : newDataInfo.slides,
    // });

    return true;
  }
 

  //Updates the ID associated with the given object to the new PostData object given (Essentially just manupulate on your end)
  updateData(newDataInfo : PostData) : boolean { //Returns true if was a success, false otherwise


    var data: PostData = newDataInfo;

    //const db = getDatabase(app);

    update(ref(DATABASE, "/Posts/" + data.postID), {
      postTitle : data.postTitle,
      //Need more things to change
    });

    return true;
  }

  //remove the post that has dataID from the firebase
  removeData(dataID: string) : boolean { //Returns true if was a success, false otherwise

    //const db = getDatabase(app);

    remove(ref(DATABASE, "/Posts/" + dataID));

    return true;
  }

  ngOnInit(): void {

  }

  constructor(){
    //This might be ok for the posts?
    //const db = getDatabase();
    // const dbRef = ref(DATABASE, 'Posts/');

    // onValue(dbRef, (snapshot) => {
    //   const data = snapshot.val();
    //   this.dataSnapshot = data;
    // });

    this.dataLoaded = new Map();
  }

  async getPostTitle(dataID : string) : Promise<string> {
    const data = await get(ref(DATABASE, `Posts/${dataID}/postTitle`));
    return data.val();
  }
  
  

  async addComment(postID : string, newComment : CommentData){

    //Get comment list
    var post = await this.loadData(postID);

    //Append to comment list
    if (!post.comments){
      post.comments = new Array<CommentData>;
    } 
    post.comments.push(newComment);

    //Update database

    update(ref(DATABASE, "/Posts/" + postID), {
      comments : post.comments
    });

    console.log(post.comments);

  }

}