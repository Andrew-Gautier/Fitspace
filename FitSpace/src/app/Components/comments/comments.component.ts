import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { reload } from 'firebase/auth';
import { CommentData } from 'src/app/Database/commentData';
import { POST_MANAGER, USER_MANAGER } from 'src/main';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  //Post information
  postComments: Array<CommentData>;
  postID: string | null;
  postTitle: string | null;
  postSlides: any;
  postUsername: any;
  postUserID: any;
  
  currentUserID : string;
  authorized: boolean;

  flexdirection = "flex-row";

  //Default values in case no parameter was given, should not be called
  constructor(private route: ActivatedRoute) { 
    this.postComments = []
    this.postID = this.route.snapshot.paramMap.get('id');
    this.postTitle = "";
    this.currentUserID = "";
    this.authorized = false;
    this.loadData();
    this.setTitle();
    
    if(window.innerWidth < 600){
      this.flexdirection = "flex-column"
    }
    
  }

  // Set the title of the post 
  async setTitle(): Promise<void> {
    if (this.postID) {
      const title = await POST_MANAGER.getPostTitle(this.postID);
      this.postTitle = title;
    }
  }

  //Load data related to the post 
  async loadData(){
    if (this.postID) {
      await POST_MANAGER.updateCommentUsernames(this.postID);
      POST_MANAGER.loadData(this.postID).then( (data) => {
        this.postComments = data.comments;
        this.postSlides = data.slides;
        this.postUserID = data.userID
        this.postUsername = data.username;
      })
    }

    USER_MANAGER.loadData(sessionStorage.getItem("currentUserID")!).then( (data) => {
      this.currentUserID = data.userID;
      if(data.admin == true){
        this.authorized = true;
      }
    })
  }


  // in your component class
  reverseComments() {
    this.postComments.reverse();
  }


  //Add a new comment to the database
  async addComment(): Promise<void> {
    //Get comment information
    var newComment;
    let currentID = sessionStorage.getItem("currentUserID")
    let currentUser = sessionStorage.getItem("currentUsername")

    var text = ((document.getElementById("commentInput") as HTMLInputElement).value);

    if (!text.replace(/\s/g, '').length) { //Checks for whitespace
      alert('Please type something before you try to comment.');
      return;
    }
    
    if(currentID != null && currentUser != null){
      newComment = new CommentData(currentID, text, currentUser);
    }
    
    //UPLOAD NEW COMMENT TO DATABASE
    if(newComment && this.postID){
      await POST_MANAGER.addComment(this.postID, newComment);
    }
  
    //Reset Value
    ((document.getElementById("commentInput") as HTMLInputElement).value) = '';

    //Reload comments
    if (this.postID) {
      let data = await POST_MANAGER.loadData(this.postID)
      this.postComments = data.comments;
    }
  }

  async deleteComment(comment : any){
    await POST_MANAGER.deleteComment(this.postID!, comment);
    //Reload page to make sure user can see the changes
    location.reload();
    
  }

}
