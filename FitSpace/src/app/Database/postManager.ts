/**
 * @author Zachary Spiggle
 * @date 3/27/23
 * 
 * This object operates as an interface between client and the server for Post related content
 */

import { Component, Injectable, OnInit } from "@angular/core";
import { getDatabase, get, ref, remove, set, update, child, onValue, query, limitToLast } from "firebase/database";
import { DATABASE, USER_MANAGER, app } from "src/main";
import { PostData } from "./postData";
import { CommentData } from "./commentData";
import { SlideData } from "./slideData";


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



  /**
   * Asynchronous method to get all posts from database.
   * Note: This is inefficent and should not be a solution for the a future final product.
   * 
   * @returns A promise for an array of PostData that contains all data for every post in the database
   */
  async loadAllPosts(): Promise<Array<PostData>>{

    var posts = new Array();

    var data = await get(ref(DATABASE, 'Posts'));
    data.forEach( child => {
      //child.val();
      posts.push(child.val());
    })

    return posts;
  }
  

  /**
   * Asynchronous method to load a specified Post Data object that contains information about a single post
   * 
   * @param dataID The ID of the post object we want
   * @returns A promise for the PostData object of the post that has the same ID as our parameter
   */
  async loadData(dataID : string) : Promise<PostData> {

    var data = await get(ref(DATABASE, 'Posts/' + dataID));

    this.dataLoaded.set(dataID, data.toJSON());

    var post = this.dataLoaded.get(dataID);

    var userdata = await USER_MANAGER.loadData(post.userID);

    //If the name has been updated, update it in the database
    if(userdata.displayName != post.username){
      post.username = userdata.displayName;
      this.updateUsernameData(dataID, userdata.displayName!);
    }


    //Load all normal data
    var postdata = new PostData(
      post.postID, 
      post.userID, 
      post.username, 
      post.postTitle,
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

  /**
   * A method to create data in the firebase realtime database for a new post
   * 
   * @param newDataInfo A PostData object that contains the information about the post to store in the database
   */
  createData(newDataInfo : PostData){

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
 


  /**
   * Update the username stored in the database
   * 
   * @param postID Post ID to update the name up
   * @param newname The new username to replace the current one with
   */
  updateUsernameData(postID : string, newname : string){
    update(ref(DATABASE, "/Posts/" + postID), {
      username : newname
    });
  }

  /**
   * Remove a post from the realtime database 
   * 
   * @param dataID A string ID of the post you want to remove
   */
  removeData(dataID: string){ 
    remove(ref(DATABASE, "/Posts/" + dataID));
  }

  /**
   * Constructor, initializes data
   */
  constructor(){
    this.dataLoaded = new Map();
  }

  /**
   * Get just the title from a post ID
   * 
   * @param dataID ID of post to retrieve the title of
   * @returns A promise for a string that is the title of the given post
   */
  async getPostTitle(dataID : string) : Promise<string> {
    const data = await get(ref(DATABASE, `Posts/${dataID}/postTitle`));
    return data.val();
  }


  /**
   * Gets the post slides from a post ID
   * 
   * @param postId String id of post to get slides from 
   * @returns An array of SlideData that contains information for each slide of the post
   */
  async getPostSlides(postId: string) {
    const slideDataArray: SlideData[] = [];
    for (let i = 0; i < 10; i++) {
      const imgURL = await get(ref(DATABASE, `Posts/${postId}/postSlides/${i}/imgURL`));
      const textData = await get(ref(DATABASE, `Posts/${postId}/postSlides/${i}/textData`));
      if (imgURL.exists() || textData.exists()) {
        const slideData: SlideData = {
          imgURL: imgURL.val(),
          textData: textData.val()
        };
        slideDataArray.push(slideData);
      } else {
        break;
      }
    }
    return slideDataArray;
  }

  
  /**
   * Add a new comment to a post
   * 
   * @param postID String ID of post to add the comment on
   * @param newComment CommentData to be added to the post
   */
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

  /**
   * Update the usernames of all comments in this post
   * 
   * @param postID The ID of the post to update comments on
   */
  async updateCommentUsernames(postID : string){
    //Get comment list
    var post = await this.loadData(postID);

    var updatedComments = post.comments;

    for(let comment of updatedComments){

      let user = await USER_MANAGER.loadData(comment.userID); 

      if (comment.username != user.displayName){
        comment.username = user.displayName!;
      }
    }

    update(ref(DATABASE, "/Posts/" + postID), {
      comments : updatedComments
    });

  }


  /**
   * Remove a specified comment from the comments array stored by this post (And updates the database)
   * 
   * @param postID The post ID to remove the comment from
   * @param comment The comment to be removed
   */
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


  //normal index of uses strict equality, which doesnt work for what i need
  /**
   * Gets the index of the array that a comment is in.
   * (Same thing as indexOf, index of does not work here because indexOf uses strict equality ===)
   * 
   * @param list The list of comments to search through
   * @param comment The comment data
   * @returns The index where the comment is in the array
   */
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


  /**
   * Gets the index of the array that a string is in. 
   * (Same thing as indexOf, index of does not work here because indexOf uses strict equality ===)
   * 
   * @param list A list of IDs as strings
   * @param id The ID we are searching for
   * @returns The index where the string is within the array
   */
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