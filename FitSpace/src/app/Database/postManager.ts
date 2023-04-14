import { Component, Injectable, OnInit } from "@angular/core";
import { getDatabase, get, ref, remove, set, update, child, onValue, query, limitToLast } from "firebase/database";

import { DATABASE, USER_MANAGER, app } from "src/main";
import { PostData } from "./postData";
import { CommentData } from "./commentData";


@Injectable()
export class PostManager {

   //Path to Users part of realtime database
  PostsPath = "https://fitspace-ba5a9-default-rtdb.firebaseio.com/Posts/";

  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 100;
  maxCommentCount = 100;

  //Reference to the posts stored in database
  dataSnapshot : any; 

  dataLoaded : any;

  //Returns all posts that exist. This is not a good thing, but we have no other implementation currently
  async loadAllPosts(): Promise<Array<PostData>>{

    var posts = new Array();

    var data = await get(ref(DATABASE, 'Posts'));
    data.forEach( child => {
      //child.val();
      posts.push(child.val());
    })

    return posts;
  }
  

  //Load a singular piece from firebase (like a user)
  async loadData(dataID : string) : Promise<PostData> {

    var data = await get(ref(DATABASE, 'Posts/' + dataID));

    this.dataLoaded.set(dataID, data.toJSON());

    var post = this.dataLoaded.get(dataID);

    //Load all normal data
    var postdata = new PostData(
      post.postID, 
      post.userID, 
      post.username, 
      post.displayName,
      post.postSlides,
    );

    //If it exists, add it to the data object
    if(post.comments != null){
      postdata.comments = Object.values(post.comments);
    } 

    if(post.likes != null){
      postdata.likes = Object.values(post.likes);
    } 

    if(post.date != null){
      postdata.date = post.date;
    } 

    //return data
    return postdata;
  }

  //Creates a new post and uploads it to firebase, newDataInfo MUST BE A PostData OBJECT!!!
  createData(newDataInfo : PostData){

    //console.log(newDataInfo);

    //Set data in database
    set(ref(DATABASE, "/Posts/" + newDataInfo.postID), {
      postID : newDataInfo.postID,
      userID : newDataInfo.userID,
      username : newDataInfo.username,
      postTitle : newDataInfo.postTitle,
      postSlides : newDataInfo.slides,
      comments : [],
      likes : [],
      date : newDataInfo.date
    });

  }
 

  //Updates the ID associated with the given object to the new PostData object given (Essentially just manupulate on your end)
  //Thinking of removing this feature for now
  updateData(newDataInfo : PostData){

    var data: PostData = newDataInfo;

    update(ref(DATABASE, "/Posts/" + data.postID), {
      postTitle : data.postTitle,
      //Need more things to change
    });

  }

  //Remove the post that has dataID from the firebase
  removeData(dataID: string){ 
    remove(ref(DATABASE, "/Posts/" + dataID));
  }


  constructor(){
    this.dataLoaded = new Map();
  }

  //Returns the post title
  async getPostTitle(dataID : string) : Promise<string> {
    const data = await get(ref(DATABASE, `Posts/${dataID}/postTitle`));
    return data.val();
  }
  
  
  //Add a comment to a post
  async addComment(postID : string, newComment : CommentData){
    //Get comment list
    var post = await this.loadData(postID);

    //Append to comment list
    if (!post.comments){
      post.comments = new Array<CommentData>;
    } 

    //If you hit the max amount of comments, remove the oldest comment
    if(post.comments.length >= this.maxCommentCount){
      post.comments.shift();
    } 
    post.comments.push(newComment);

    

    //Update database
    update(ref(DATABASE, "/Posts/" + postID), {
      comments : post.comments
    });
  }

  async deleteComment(postID : string, comment : CommentData){
    //Get comment list
    var post = await this.loadData(postID);

    var updatedComments = post.comments;

    //Get the index and splice over it, then update the database
    let removeIndex = this.IndexOfComment(updatedComments, comment);
    if(removeIndex != -1){
      updatedComments.splice(removeIndex, 1);
      //Update database
      update(ref(DATABASE, "/Posts/" + postID), {
        comments : updatedComments
      });
    } else {
      console.log("Comment not found.");
    }
    
  }

  async likePost(postID :string, userID : string){
    //Get likes list
    var post = await this.loadData(postID);

    //Append to comment list
    if (!post.likes){
      post.likes = new Array<string>;
    } 

    post.likes.push(userID);

    //Update database
    update(ref(DATABASE, "/Posts/" + postID), {
      likes : post.likes
    });

    USER_MANAGER.addLikedPost(userID, postID);

  }

  async unlikePost(postID :string, userID : string){
    //Get comment list
    var post = await this.loadData(postID);

    var updatedLikes = Object.values(post.likes);

    let removeIndex = this.IndexOf(updatedLikes, userID);

    if(removeIndex != -1){

      updatedLikes.splice(removeIndex, 1);
      //Update database
      update(ref(DATABASE, "/Posts/" + postID), {
        likes : updatedLikes
      });

    } else {
      console.log("Like userID not found.");
    }

    //Get the index and splice over it, then update the database
    USER_MANAGER.removeLikedPost(userID, postID);



  }


  //normal index of uses strict equality, which doesnt work for what i need
  IndexOfComment(list : Array<CommentData>, comment: CommentData) {    
    for (var i = 0; i < list.length; i++) {
      //If the textdata and userdata is the same, return that index
        if (list[i].textData == comment.textData
           && list[i].userID == comment.userID) {
            return i;
        }
    }
    return -1;
  }

    //normal index of uses strict equality, which doesnt work for what i need
    IndexOf(list : Array<String>, id: string) {    
      for (var i = 0; i < list.length; i++) {
        //If the textdata and userdata is the same, return that index
          if (list[i] == id){
            return i;
          }
             
      }
      return -1;
    }
}