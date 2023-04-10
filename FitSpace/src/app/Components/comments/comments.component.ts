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

  constructor(private route: ActivatedRoute) { 
    this.postComments = []//new Array<CommentData>; 
    //this.newCommentText = ''; 
    //this.postID = null;
    this.postID = this.route.snapshot.paramMap.get('id');
    this.postTitle = "";
    //this.postTitle = this.route.snapshot.paramMap.get('title');;
    this.loadComments();
  }

  ngOnInit(): void {
    this.loadComments();

    //this.comments.filter(comment => comment.postId === this.postId);
  }

  loadComments(){
    //this.postID = this.route.snapshot.paramMap.get('id');

    if (this.postID) {
    //  this.postId = +this.postID;

      POST_MANAGER.loadData(this.postID).then( (data) => {
        this.postComments = data.comments;
        (document.getElementById("PostTitle") as HTMLHeadingElement).textContent = "Comments for Post: " + data.postTitle;
        this.postTitle = data.postTitle;
        console.log(this.postComments);
        console.log(this.postTitle);
      })
      
    }

    //console.log(this.postComments);
  }

  async addComment(): Promise<void> {
    var newComment;
    let currentID = sessionStorage.getItem("currentUserID")
    var text = ((document.getElementById("commentInput") as HTMLInputElement).value);
    
    if (!text.replace(/\s/g, '').length) { //Checks for whitespace
      alert('Please type something before you try to comment.');
      return;
    }
    
    if(currentID != null){
      newComment = new CommentData(currentID, text);
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
