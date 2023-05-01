/**
 * @author Zachary Spiggle
 * @date 4/03/23
 * 
 * This object operates as an interface between client and the server for User content
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideData } from 'src/app/Database/slideData';
import { POST_MANAGER, STORAGE, USER_MANAGER } from 'src/main';
import { deleteObject, ref } from 'firebase/storage';
@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit{

  //Post information
  @Input() PostTitle : string;
  @Input() Slides : SlideData[];
  @Input() Username : string;
  @Input() userID : string;
  @Input() PostID : string;
  likes : any;
  commentCount : number;

  likedText : string;

  likeCount : number;
  //Flag for if the user has the authorization to delete the post
  authorized : boolean;

  /**
   * Constructor to provide defaul values for a post object
   * 
   * @param router The router object for Angular to manage routing
   */
  constructor(private router: Router){
    //Default values
    this.Slides = [];
    this.PostTitle = "Missing Post";
    this.Username = "Missing User";
    this.PostID = "0";
    this.userID = "";
    this.likedText = "Like";
    this.commentCount = 0;
    this.likeCount = 0;

    this.authorized = false;
   
  }

  /**
   * Method that is called when object is loaded to retrieve data from database
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * Method to initialize values with data from realtime database
   */
  async getData(){
    //Get postdata
    var postdata = await POST_MANAGER.loadData(this.PostID);

    //Initialize post variables
    this.likes = postdata.likes
    
    if(postdata.comments){
      this.commentCount = postdata.comments.length;
    }

    if(postdata.likes){
      this.likeCount = postdata.likes.length;
    }

    //Get the current signed in user
    let currentUser = sessionStorage.getItem("currentUserID");

    if(currentUser){
      if(postdata.userID == currentUser){
        this.authorized = true;
        return; //return for optimization
      } 
      let userdata = await USER_MANAGER.loadData(currentUser);  
      if (userdata.admin == true){
        this.authorized = true;
      }

      if(this.likes.includes(currentUser)){
        this.likedText = "Un-like";
      }
    }
  }

  /**
   * Method to handle button press for deleting a post
   * 
   * @param postID String ID of a post to go delete
   */
  async deletePost(postID : string){
    //Make sure the user meant to do this
    if(confirm("Are you sure you want to delete this post?")){
      //loop through slides, delete image at URL 
      let fileRef;
      for(let slide of this.Slides){

        //If the imgURL exists
        if(slide.imgURL){

            //Create reference to the file
            fileRef = ref(STORAGE, slide.imgURL);

            //Delete the object in the Firebase Storage
            await deleteObject(fileRef).then(() => {
              // File deleted successfully
            }).catch((error) => {
              console.log("ERROR DELETEING FILE: " + error);
            });
        }
      }
      //Delete postdata from firebase 
      POST_MANAGER.removeData(postID);

      //Reload page to make sure user can see the changes
      location.reload();
    }
  }


  /**
   * Method that routes user to a new unique page based on id to display comments for
   * @param id String of the post id to route to
   * @param title String of the title of the post we are routing too
   */
  viewComments(id: string, title : string): void {
    this.router.navigate(['comments', id]);
  }

}
