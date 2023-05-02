import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POST_MANAGER } from 'src/main';

/**
 * @author Jonathan Dofka, Zachary Spiggle
 * @date 03/01/2023
 * 
 * This component handles the community page functionality
 */

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})

export class CommunityPageComponent implements OnInit{

  /** The list of post data */
  posts : any[];

  /** The number of posts to display in a single chunk */
  chunkSize =3;

  /**
   * Initializes a new instance of the CommunityPageComponent class.
   * @param router The Angular router for viewComments method.
   */
  constructor(private router: Router){
    this.posts = []; 
    if(window.innerWidth < 600){
      this.chunkSize = 1;
    }
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.updatePosts();
  }

  /**
   * Updates the posts variable with 
   * all of the post data into the displayed posts.
   */
  async updatePosts(){
    this.posts = await POST_MANAGER.loadAllPosts();
  }

  /**
   * Routes to a new unique page based on id.
   * @param id The id of the post 
   * 
   */
   viewComments(id: number): void {
    this.router.navigate(['comments', id]);
  }

}
