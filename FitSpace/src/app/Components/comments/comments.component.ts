import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentData } from 'src/app/Database/commentData';
import { POST_MANAGER } from 'src/main';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  //postId!: number;
  postComments: Array<CommentData>;
  //newCommentText: string;
  postID: string | null;
  postTitle: string | null;

  postSlides: any;
  postUsername: any;
  postUserID: any;


  constructor(private route: ActivatedRoute) { 
    this.postComments = []//new Array<CommentData>; 
    //this.newCommentText = ''; 
    //this.postID = null;
    this.postID = this.route.snapshot.paramMap.get('id');
    this.postTitle = "";
    //this.postTitle = this.route.snapshot.paramMap.get('title');;
    this.loadComments();
    this.setTitle();
    
  }

  ngOnInit(): void {
    //this.comments.filter(comment => comment.postId === this.postId);
  }

  async setTitle(): Promise<void> {
    if (this.postID) {
      const title = await POST_MANAGER.getPostTitle(this.postID);
      this.postTitle = title;
    }
  }

  loadComments(){
    //this.postID = this.route.snapshot.paramMap.get('id');

    if (this.postID) {
    //  this.postId = +this.postID;

      POST_MANAGER.loadData(this.postID).then( (data) => {
        this.postComments = data.comments;
        this.postSlides = data.slides;
        this.postUserID = data.userID
        this.postUsername = data.username;

        //Update post display
        // for(let i = 0; i <  this.postSlides.length; i++){
        //   let currentSlide = this.postSlides[i];   
        // }
        
        //Refresh document??
        // var display = document.getElementById("display");
        // if(display){
        //   let content = display.innerHTML
        //   display.innerHTML = content;
        // }
        

        console.log(this.postSlides);
        //console.log(this.postComments);
        //console.log(this.postTitle); //how is this null while the other part isnt
      })
      
    }

    //console.log(this.postComments);
  }

  async addComment(): Promise<void> {
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
    
      // {
    //   id: this.comments.length + 1,
    //   postId: this.postId,
    //   text: this.newCommentText
    // };

    //this.comments.push(newComment);

    //UPLOAD NEW COMMENT TO DATABASE
    if(newComment && this.postID){
      await POST_MANAGER.addComment(this.postID, newComment);
    }
  

    //Reset Value
    //this.newCommentText = '';
    ((document.getElementById("commentInput") as HTMLInputElement).value) = '';


    //this.postComments = this.comments.filter(comment => comment.postId === this.postId);
    if (this.postID) {
      let data = await POST_MANAGER.loadData(this.postID)
      this.postComments = data.comments;
      //console.log(data.comments);
    }
  }
}
