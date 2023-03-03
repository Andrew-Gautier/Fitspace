import { Component } from '@angular/core';
import { ExercisePostModel } from '../../Components/exercise-post-card/exercise-post.model';
import { mock_list } from '../../Components/exercise-post-card/mock_list';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent {

  cards: ExercisePostModel [] = [];

  constructor(){
    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }
  }

}
