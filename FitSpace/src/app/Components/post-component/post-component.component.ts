import { Component, Input, OnInit } from '@angular/core';
import { mock_list_slides } from './mock_list';
import { Router } from '@angular/router';
import { SlideData } from 'src/app/Database/slideData';
import { POST_MANAGER } from 'src/main';
@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit{
  //slides = mock_list_slides;

  @Input() PostTitle : string;
  @Input() Slides : SlideData[];
  @Input() Username : string;
  @Input() userID : string;
  @Input() PostID : string;
  likes : any;
  commentCount : number;
 // @Input() commentsLength : number | 0;

  constructor(private router: Router){
    //this.Slides = mock_list_slides;
    this.Slides = [];
    this.PostTitle = "Missing Post";
    this.Username = "Missing User";
    this.PostID = "0";
    this.userID = "";
    this.commentCount = 0;
    //this.commentsLength = 0;
    // this.likes = ""
    //console.log(this.PostID);
    //console.log(this.Slides);

    // setTimeout(() => {
    //   this.updateSlides();
    // }, 100);

    
  }
  ngOnInit(): void {
    this.getData();
    //throw new Error('Method not implemented.');
  }

  async getData(){
    var postdata = await POST_MANAGER.loadData(this.PostID);

    this.likes = postdata.likes

    if(postdata.comments){
      this.commentCount = postdata.comments.length;
    }
    console.log(this.commentCount);
  }

  // async updateSlides(){

  //   let data = await POST_MANAGER.loadData(this.PostID);
  //   this.Slides = data.slides;
  // }

  //This routes to a new unique page based on id 
  viewComments(id: string, title : string): void {
    this.router.navigate(['comments', id]);
  }

  likePost(id:string){
    let currentuser = sessionStorage.getItem("currentUserID");


  }
}
