import { Component } from '@angular/core';
import { ExercisePostModel } from '../../Components/exercise-post-card/exercise-post.model';
import { mock_list } from '../../Components/exercise-post-card/mock_list';
import {CreateImageModel} from '../../Components/create-post-card/create-post.model';
import {CreateTextModel} from '../../Components/create-post-card/create-post.model';
import {CreateVidModel} from '../../Components/create-post-card/create-post.model';
import { recent1 } from '../../Components/create-post-card/mock_lists';
import { recent2 } from '../../Components/create-post-card/mock_lists';
import { recent3 } from '../../Components/create-post-card/mock_lists';


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

  constructor(){
    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }

    for(var txt of recent1){
      console.log(txt);
      this.text.push(txt);
    }

    for(var link of recent2){
      console.log(link);
      this.vid.push(link);
    }

    for(var pix of recent3){
      console.log(pix);
      this.pic.push(pix);
    }


  }

  

}
