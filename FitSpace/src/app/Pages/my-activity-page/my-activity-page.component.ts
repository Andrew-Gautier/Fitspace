import { Component } from '@angular/core';
import { MyActivityPostModel } from '../../Components/my-activity-post-card/my-activity-post.model';
import { mock_list } from '../../Components/my-activity-post-card/mock_list';

@Component({
  selector: 'app-my-activity-page',
  templateUrl: './my-activity-page.component.html',
  styleUrls: ['./my-activity-page.component.css']
})
export class MyActivityPageComponent {
  cards: MyActivityPostModel [] = [];

  constructor(){
    for (var item of mock_list){
      console.log(item);
      this.cards.push(item);
    }
  }
}
