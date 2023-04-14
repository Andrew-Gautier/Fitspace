import { Component, OnInit } from '@angular/core';
import { PostData } from 'src/app/Database/postData';
import { POST_MANAGER, USER_MANAGER } from 'src/main';

@Component({
  selector: 'app-my-activity-page',
  templateUrl: './my-activity-page.component.html',
  styleUrls: ['./my-activity-page.component.css']
})
export class MyActivityPageComponent implements OnInit{

  likedposts : any[];

  constructor(){
    this.likedposts = [];
  }

  ngOnInit(): void {
      this.loadposts();
  }

  async loadposts(){
    let currentuser = await USER_MANAGER.loadData(sessionStorage.getItem("currentUserID")!);
    
    if(currentuser){
      let likedpostIDs = Object.values(currentuser.likedPosts);

      for(let postID of likedpostIDs){
        let post = await POST_MANAGER.loadData(postID);
        this.likedposts.push(post);
      }
    }

    console.log(this.likedposts);
  
  }



}
