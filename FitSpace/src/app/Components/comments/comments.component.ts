import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  postId!: number;
  comments: any[] = [
    { id: 1, postId: 1, text: 'This is great 1' },
    { id: 2, postId: 1, text: 'This is real good 2' },
    { id: 5, postId: 1, text: 'This is very good 5'},
    { id: 3, postId: 2, text: 'This is very nice 3' },
    { id: 4, postId: 2, text: 'This is even better 4' },
   
  ];
  postComments: any[];

  constructor(private route: ActivatedRoute) { this.postComments = []; }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.postId = +idParam;
    }
    this.postComments = this.comments.filter(comment => comment.postId === this.postId);
  }
}
