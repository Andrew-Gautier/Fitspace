import { Component } from '@angular/core';
import { CreateImageModel} from '../../Components/create-post-card/create-post.model';
import { CreateVidModel } from '../../Components/create-post-card/create-post.model';
import { CreateTextModel } from '../../Components/create-post-card/create-post.model';
import { textTemp } from '../../Components/create-post-card/mock_lists';
import { vidTemp } from '../../Components/create-post-card/mock_lists';
import { picTemp } from '../../Components/create-post-card/mock_lists';
import { PostData } from 'src/app/Database/postData';
import { POST_MANAGER, STORAGE, USER_MANAGER, hashFunction } from 'src/main';
import { SlideData } from 'src/app/Database/slideData';
import { ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent {

  maxSlides = 10;

  //?????
  // text: CreateTextModel [] = [];
  // pic: CreateImageModel [] = [];
  // vid: CreateVidModel [] = [];

  //loadedImage : any;
  loadedSlides : Array<any>;

  previewTitle : string;
  previewUsername : string | null;
  previewUserID : string | null;
  previewSlides : Array<any>;

  constructor(){

    //What is this doing?
    // for(var link of vidTemp){ //video post
    //   console.log(link);
    //   this.vid.push(link);
    // }
    // for ( var txt of textTemp) { // text post
    //   console.log(txt);
    //   this.text.push(txt);
    // }
    // for(var pix of picTemp) { //picture post
    //   console.log(pix);
    //   this.pic.push(pix);
    // }

    this.previewTitle = "Preview";
    this.previewUsername = sessionStorage.getItem("currentUsername");;
    this.previewUserID = sessionStorage.getItem("currentUserID");;
    this.loadedSlides = new Array<any>();
    this.previewSlides = new Array<any>();
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


    //Convert slides into proper slides (URLs) (USE loadedSlides instead of preview slides)

    var postTitleInput = ((document.getElementById("titleInput") as HTMLInputElement).value);
    //var imgInput = ((document.getElementById("imageLinkInput") as HTMLInputElement).value);
    //var textInput = ((document.getElementById("textInput") as HTMLInputElement).value);


    //Check for null values
    if(postTitleInput != "" && this.loadedSlides.length > 0){

      let newPost;
      let slides = new Array<SlideData>(); 

      //Create slides for every loaded slide 
      for(let i = 0; i <  this.loadedSlides.length; i++){
        let slide = this.loadedSlides[i];

        const newImagePath = 'images/' + postID + i + ".png"
        const newImageRef = ref(STORAGE, newImagePath);

        uploadBytes(newImageRef, slide[0]).then((snapshot) => {
          console.log('Uploaded a blob or file!' + i);
        });

        var newSlide = new SlideData(newImagePath, slide[1]);
        slides.push(newSlide)
      }



      //document.getElementById("titleInput")
      if(userID != null && data?.displayName != null){
        newPost = new PostData(postID, userID, data?.displayName, postTitleInput, slides);
      }
      
      if(newPost != undefined){
        POST_MANAGER.createData(newPost);
        console.log("Uploaded Post");
      }


      
      //Cleanup
      //((document.getElementById("titleInput") as HTMLInputElement).value) = '';
      //((document.getElementById("imageInput") as HTMLInputElement).value) = undefined;
      //(document.getElementById("imageInput") as HTMLInputElement).files = new FileList;
     // this.clearInputFile(document.getElementById("imageInput"));
      //((document.getElementById("imageLinkInput") as HTMLInputElement).value) = '';
      //((document.getElementById("textInput") as HTMLInputElement).value) = '';

      // console.log(newPost);
      // console.log(slides);

      //Clears everything properly
      this.cancelPost();

    } else {
      alert("Please fill out all boxes");
    }
    
  }

  async updatePreview(){

    //Update title
    if(((document.getElementById("titleInput") as HTMLInputElement).value) != ""){
      this.previewTitle = ((document.getElementById("titleInput") as HTMLInputElement).value);
    }


    //Update slides 
    //this.previewSlides = this.loadedSlides;
    //Needs to be handled differently
    for(let i = 0; i <  this.previewSlides.length; i++){
      // var imgPreview = document.getElementById('preview' + i);
      // console.log(imgPreview);
      let currentSlide = this.previewSlides[i];

      //var file = currentSlide;

    }

    
    
  }

  async createSlide(){


    if(this.loadedSlides.length < this.maxSlides){
      //Needs to create another version of slide for the loadedSlides

      //Image aspect of slide
      var imageInput = document.getElementById("imageInput") as HTMLInputElement;
      //var imgPreview = document.getElementById("testImageDiv");
      var textInput = (document.getElementById("textInput") as HTMLInputElement).value

      
      if(imageInput.files){
        const fileReader = new FileReader();
        
        var file = imageInput.files[0];
        fileReader.readAsDataURL(file);

        fileReader.addEventListener("load",() => {
        // console.log(fileReader.result);
          //return this.result;
          this.previewSlides.push([ fileReader.result, textInput]);
        });


        //ADD SLIDE TO LOADED SLIDES OF CORRECT TYPE

        const byteFile = await this.getAsByteArray(file)

        console.log(byteFile);
        console.log(byteFile.length);

        //this.loadedImage = byteFile;
        this.loadedSlides.push([byteFile, textInput]);
      }
      

      this.updatePreview();
    } else {
      alert("You are at the maximum amount of slides!");
    }
  }

  deleteSlide(){
    this.previewSlides.pop();
    this.loadedSlides.pop();
    this.updatePreview();
  }

  cancelPost(){
      //Cleanup
      ((document.getElementById("titleInput") as HTMLInputElement).value) = '';
      //this.clearInputFile(document.getElementById("imageInput"));
      ((document.getElementById("textInput") as HTMLInputElement).value) = '';

      //Reset vars
      this.previewTitle = "Preview";
      this.previewUsername = sessionStorage.getItem("currentUsername");;
      this.previewUserID = sessionStorage.getItem("currentUserID");;
      this.loadedSlides = new Array<any>();
      this.previewSlides = new Array<any>();
  }



  // IMAGE FUNCTIONS --------------------------------------


  async changedImage(){
    var imageInput = document.getElementById("imageInput") as HTMLInputElement;
    var imgPreview = document.getElementById("testImageDiv");


    if(imageInput.files){
      if(imgPreview != null){
        //preview.style.backgroundImage = URL.createObjectURL(imageInput.files[0]);
        const fileReader = new FileReader();
        var file = imageInput.files[0];
        fileReader.readAsDataURL(file);

        fileReader.addEventListener("load", function () {
          if(imgPreview != null){
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '"style="width:20vw; height:20vh;" />';
          }
        });
        
        // const byteFile = await this.getAsByteArray(file)

        // console.log(byteFile);
        // console.log(byteFile.length);

        // this.loadedImage = byteFile;
        //this.loadedImage = file;
        //console.log("Made file");
      }
      
    }
  }

  //Helper functions 
  //Source: https://dilshankelsen.com/convert-file-to-byte-array/
  //Best solution I've found
  async getAsByteArray(file : any): Promise<any> {
    return new Uint8Array(await this.readFile(file))
  }

  async readFile(file : any): Promise<ArrayBufferLike> {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader()
  
      // Register event listeners
      reader.addEventListener("loadend", e => resolve((e.target!.result) as ArrayBufferLike))
      reader.addEventListener("error", reject)
  
      // Read file
      reader.readAsArrayBuffer(file)
    })
  }

  //Doesnt work?
//   clearInputFile(f : any){
//     //console.log("Attempt");
//     if(f.value){
//         try{
//             f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
//         }catch(err){ }
//         if(f.value){ //for IE5 ~ IE10
//             var form = document.createElement('form'),
//                 parentNode = f.parentNode, ref = f.nextSibling;
//             form.appendChild(f);
//             form.reset();
//             parentNode.insertBefore(f,ref);
//         }
//     }
// }

}
