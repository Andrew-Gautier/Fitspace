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
    //this.loadposts();
  }

  ngOnInit(): void {
      this.loadposts();
  }

  async loadposts(){
    let currentuser = await USER_MANAGER.loadData(sessionStorage.getItem("currentUserID")!);
    
    if(currentuser){
      let likedpostIDs = Object.values(currentuser.likedPosts);

      for(let postID of likedpostIDs){

        try{
          let post = await POST_MANAGER.loadData(postID);

          this.likedposts.push(post);

          //console.log(document.getElementById(postID)!.innerHTML);

        } catch (error){
          USER_MANAGER.removeLikedPost(sessionStorage.getItem("currentUserID")!, postID);
        }
        

          
      }
    }

    console.log(this.likedposts);
  
  }



}
