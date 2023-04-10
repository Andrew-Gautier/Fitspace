import { Component } from '@angular/core';
import { CreateImageModel} from '../../Components/create-post-card/create-post.model';
import { CreateVidModel } from '../../Components/create-post-card/create-post.model';
import { CreateTextModel } from '../../Components/create-post-card/create-post.model';
import { textTemp } from '../../Components/create-post-card/mock_lists';
import { vidTemp } from '../../Components/create-post-card/mock_lists';
import { picTemp } from '../../Components/create-post-card/mock_lists';
import { PostData } from 'src/app/Database/postData';
import { POST_MANAGER, USER_MANAGER, hashFunction } from 'src/main';
import { SlideData } from 'src/app/Database/slideData';

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
  

  async postWorkout(){
    let date = new Date();

    //This entire thing sets the postID to the UserID plus the hash of the current time stamp
    const userID = sessionStorage.getItem("currentUserID");
    var data = null;
    if(userID != null){
      data = await USER_MANAGER.loadData(userID);
    }

    let postID = hashFunction(date.getTime().toString()).toString(); 
    if(data?.userID != undefined){
       postID = postID + data?.userID;
    }
    //Excessive I know

    var postTitleInput = ((document.getElementById("titleInput") as HTMLInputElement).value);
    let newPost;

    var imgInput = ((document.getElementById("imageLinkInput") as HTMLInputElement).value);
    var textInput = ((document.getElementById("textInput") as HTMLInputElement).value);
    var newSlide = new SlideData(imgInput, textInput);
    let slides = new Array<SlideData>(); 
    slides.push(newSlide)

    //document.getElementById("titleInput")
    if(userID != null && data?.displayName != null){
      newPost = new PostData(postID, userID, data?.displayName, postTitleInput, slides);
    }
    
    if(newPost != undefined){
      POST_MANAGER.createData(newPost);
    }

    //Cleanup
    ((document.getElementById("titleInput") as HTMLInputElement).value) = '';
    ((document.getElementById("imageLinkInput") as HTMLInputElement).value) = '';
    ((document.getElementById("textInput") as HTMLInputElement).value) = '';

    console.log(newPost);
    console.log(slides);
  }

}
