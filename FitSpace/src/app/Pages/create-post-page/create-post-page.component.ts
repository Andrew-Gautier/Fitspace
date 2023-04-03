import { Component } from '@angular/core';
import { CreateImageModel} from '../../Components/create-post-card/create-post.model';
import { CreateVidModel } from '../../Components/create-post-card/create-post.model';
import { CreateTextModel } from '../../Components/create-post-card/create-post.model';
import { textTemp } from '../../Components/create-post-card/mock_lists';
import { vidTemp } from '../../Components/create-post-card/mock_lists';
import { picTemp } from '../../Components/create-post-card/mock_lists';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent {

  text: CreateTextModel [] = [];
  pic: CreateImageModel [] = [];
  vid: CreateVidModel [] = [];

  constructor(){
  
    for(var link of vidTemp){ //video post
      console.log(link);
      this.vid.push(link);
    }
    for ( var txt of textTemp) { // text post
      console.log(txt);
      this.text.push(txt);
    }
    for(var pix of picTemp) { //picture post
      console.log(pix);
      this.pic.push(pix);
    }

    
  }
}
