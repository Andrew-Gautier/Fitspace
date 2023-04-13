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

  //Flag for if the user has the authorization to delete the post
  authorized : boolean;

  constructor(private router: Router){
    //Default values
    this.Slides = [];
    this.PostTitle = "Missing Post";
    this.Username = "Missing User";
    this.PostID = "0";
    this.userID = "";
    this.commentCount = 0;

    this.authorized = false;
   
  }

  //Load data when element is initialized
  ngOnInit(): void {
    this.getData();
  }

  //Load the data for the post and user authorization
  async getData(){
    //Get postdata
    var postdata = await POST_MANAGER.loadData(this.PostID);

    //Initialize post variables
    this.likes = postdata.likes
    
    if(postdata.comments){
      this.commentCount = postdata.comments.length;
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
    }
  }

  // Delete the post button functionality
  deletePost(postID : string){
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
            deleteObject(fileRef).then(() => {
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

  //This routes to a new unique page based on id to display comments for
  viewComments(id: string, title : string): void {
    this.router.navigate(['comments', id]);
  }

  //This is not implemented yet!!!
  likePost(id:string){
    let currentuser = sessionStorage.getItem("currentUserID");
    if(currentuser && !(currentuser in this.likes)){

    } else {
      alert("You've already liked this post");
    }

  }
}
