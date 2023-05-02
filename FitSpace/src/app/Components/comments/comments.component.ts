import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlideData } from 'src/app/Database/slideData';
import { CommentData } from 'src/app/Database/commentData';
import { POST_MANAGER, USER_MANAGER } from 'src/main';

/**
 * @author Jonathan Dofka, Zachary Spiggle
 * @date 04/05/2023
 * 
 * This component handles the community page functionality
 */

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  //Post information
  postComments: Array<CommentData>; //an array of comments for the post
  postID: string | null; // ID of the post
  postTitle: string | null; // Title of the post
  Slides: Array<SlideData> //An array of slides for the post
  postSlides: any; //Slides of the post
  postUsername: any; // Username of the post owner
  postUserID: any; // UserID of the pots owner



  currentUserID: string; //ID of the current user
  authorized: boolean; //Whether the current user is authorized for certain actions (deleting etc..)

  flexdirection = "flex-row"; // The directon of the flex container for comment section

  /**
   * Creates an instance of CommentsComponent.
   * @param {ActivatedRoute} route - The current route
   */
  constructor(private route: ActivatedRoute) {
    this.postComments = [];
    this.postID = this.route.snapshot.paramMap.get('id');
    this.Slides = [];
    this.postTitle = "";
    this.currentUserID = "";
    this.authorized = false;
    this.loadData();
    this.setTitle();

    //set flex direction based on screen size
    if (window.innerWidth < 600) {
      this.flexdirection = "flex-column"
    }

  }

  /**
   * Sets the title of the post.
   * @returns {Promise<void>} - A promise that resolves when the title is set
   */
  async setTitle(): Promise<void> {
    if (this.postID) {
      const title = await POST_MANAGER.getPostTitle(this.postID);
      this.postTitle = title;
    }
  }



  /**
   * Loads data related to the post.
   */
  async loadData() {
    if (this.postID) {
      await POST_MANAGER.updateCommentUsernames(this.postID);
      this.Slides = await POST_MANAGER.getPostSlides(this.postID);

      //Load data for the post
      POST_MANAGER.loadData(this.postID).then((data) => {
        this.postComments = data.comments;
        this.postSlides = data.slides;
        this.postUserID = data.userID
        this.postUsername = data.username;
      })
    }

    // Load data for the current user
    USER_MANAGER.loadData(sessionStorage.getItem("currentUserID")!).then((data) => {
      this.currentUserID = data.userID;
      if (data.admin == true) {
        this.authorized = true;
      }
    })
  }


  /**
   * Reverses the order of the comments.
   */
  reverseComments() {
    this.postComments.reverse();
  }


  /**
   * Adds a new comment to the database.
   * @returns {Promise<void>} - A promise that resolves when the comment is added
   */
  async addComment(): Promise<void> {
    //Get comment information
    var newComment;
    const currentID = sessionStorage.getItem("currentUserID")
    const currentUser = sessionStorage.getItem("currentUsername")

    var text = ((document.getElementById("commentInput") as HTMLInputElement).value);

    if (!text.replace(/\s/g, '').length) { //Checks for whitespace
      alert('Please type something before you try to comment.');
      return;
    }

    if (currentID != null && currentUser != null) {
      newComment = new CommentData(currentID, text, currentUser);
    }

    //UPLOAD NEW COMMENT TO DATABASE
    if (newComment && this.postID) {
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

  /**
   * Deletes the given comment from the database and reloads the comments section of the post.
   * @param comment - The comment to be deleted.
   */
  async deleteComment(comment: any) {
    await POST_MANAGER.deleteComment(this.postID!, comment);
    //Reload page to make sure user can see the changes
    location.reload();

  }

}
