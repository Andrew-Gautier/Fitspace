import { Component, OnInit } from '@angular/core';
import { ExercisePostModel } from '../../Components/exercise-post-card/exercise-post.model';
import { mock_list } from '../../Components/exercise-post-card/mock_list';
import {CreateImageModel} from '../../Components/create-post-card/create-post.model';
import {CreateTextModel} from '../../Components/create-post-card/create-post.model';
import {CreateVidModel} from '../../Components/create-post-card/create-post.model';
import { recent1 } from '../../Components/create-post-card/mock_lists';
import { recent2 } from '../../Components/create-post-card/mock_lists';
import { recent3 } from '../../Components/create-post-card/mock_lists';
import { Router } from '@angular/router';
import { POST_MANAGER } from 'src/main';
import { PostComponentComponent } from 'src/app/Components/post-component/post-component.component';




@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent {



  cards: ExercisePostModel [] = [];
  pic: CreateImageModel [] = [];
  text: CreateTextModel [] = [];
  vid: CreateVidModel [] = [];

  //the posts array is mock data for testing out comment component
  // posts: any[] = [
  //   { id: 1, title: 'Post 1', body: 'Lorem ipsum dolor sit amet.' },
  //   { id: 2, title: 'Post 2', body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.' },
  //   { id: 3, title: 'Post 3', body: 'At vero eos et accusamus et iusto odio dignissimos.' },
  // ];

  posts : any[];

  constructor(private router: Router){
    for (var item of mock_list){
      //console.log(item);
      this.cards.push(item);
    }

    for(var txt of recent1){
     // console.log(txt);
      this.text.push(txt);
    }

    for(var link of recent2){
     // console.log(link);
      this.vid.push(link);
    }

    for(var pix of recent3){
     // console.log(pix);
      this.pic.push(pix);
    }

    //this.posts = POST_MANAGER.loadAllPosts();

    this.posts = []; //temp
    this.updatePosts();

  }

  async updatePosts(){
    this.posts = await POST_MANAGER.loadAllPosts();
    //console.log(this.posts[0].postSlides);
  }

  //This routes to a new unique page based on id 
   viewComments(id: number): void {
    this.router.navigate(['comments', id]);
  }

  

}
