import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POST_MANAGER } from 'src/main';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})

export class CommunityPageComponent implements OnInit{

  //List of post data
  posts : any[];
  chunkSize =3;

  //Default values
  constructor(private router: Router){
    this.posts = []; 
    if(window.innerWidth < 600){
      this.chunkSize = 1;
    }
  }

  //Initialize pots on load
  ngOnInit(): void {
    this.updatePosts();
  }

  //Fill the posts variable with postdata
  async updatePosts(){
    //Loads all posts into the displayed posts
    this.posts = await POST_MANAGER.loadAllPosts();
  }

  //This routes to a new unique page based on id 
   viewComments(id: number): void {
    this.router.navigate(['comments', id]);
  }

}
