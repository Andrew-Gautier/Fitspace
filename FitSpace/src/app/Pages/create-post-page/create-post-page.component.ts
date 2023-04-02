import { Component } from '@angular/core';
import { CreatePostModel} from '../../Components/create-post-card/create-post.model';
import { mock_list} from '../../Components/create-post-card/mock_lists';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent {

  card: CreatePostModel [] = [];

  constructor(){
    for (var input of mock_list){
      console.log(input);
      this.card.push(input);
    }
  }
}
