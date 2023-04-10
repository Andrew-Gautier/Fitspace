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
  postId!: number;
  // comments: any[] = [
  //   { id: 1, postId: 1, text: 'This is great 1' },
  //   { id: 2, postId: 1, text: 'This is real good 2' },
  //   { id: 5, postId: 1, text: 'This is very good 5'},
  //   { id: 3, postId: 2, text: 'This is very nice 3' },
  //   { id: 4, postId: 2, text: 'This is even better 4' },
   
  // ];
  postComments: Array<CommentData>;
  //newCommentText: string;
  postID: string | null;

  constructor(private route: ActivatedRoute) { 
    this.postComments = new Array<CommentData>; 
    //this.newCommentText = ''; 
    //this.postID = null;
    this.postID = this.route.snapshot.paramMap.get('id');
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
        console.log(this.postComments);
      })
      
    }

    //console.log(this.postComments);
  }

  async addComment(): Promise<void> {
    var newComment;
    let currentID = sessionStorage.getItem("currentUserID")
    var text = ((document.getElementById("commentInput") as HTMLInputElement).value);
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
