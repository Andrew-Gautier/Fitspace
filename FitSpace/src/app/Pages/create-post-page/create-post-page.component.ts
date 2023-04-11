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

  //?????
  text: CreateTextModel [] = [];
  pic: CreateImageModel [] = [];
  vid: CreateVidModel [] = [];

  loadedImage : any;

  constructor(){

    //What is this doing?
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
    //var imgInput = ((document.getElementById("imageLinkInput") as HTMLInputElement).value);
    var textInput = ((document.getElementById("textInput") as HTMLInputElement).value);


    //Check for null values
    if(postTitleInput != "" && textInput != ""){

      const newImagePath = 'images/' + postID + ".png"
      const newImageRef = ref(STORAGE, newImagePath);

      uploadBytes(newImageRef, this.loadedImage).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      let newPost;
      var newSlide = new SlideData(newImagePath, textInput);
      let slides = new Array<SlideData>(); 
      slides.push(newSlide)

      //document.getElementById("titleInput")
      if(userID != null && data?.displayName != null){
        newPost = new PostData(postID, userID, data?.displayName, postTitleInput, slides);
      }
      
      if(newPost != undefined){
        POST_MANAGER.createData(newPost);
        console.log("Uploaded Post");
      }


      
      //Cleanup
      ((document.getElementById("titleInput") as HTMLInputElement).value) = '';
      //((document.getElementById("imageInput") as HTMLInputElement).value) = undefined;
      //(document.getElementById("imageInput") as HTMLInputElement).files = new FileList;
      this.clearInputFile(document.getElementById("imageInput"));
      //((document.getElementById("imageLinkInput") as HTMLInputElement).value) = '';
      ((document.getElementById("textInput") as HTMLInputElement).value) = '';

      // console.log(newPost);
      // console.log(slides);
    } else {
      alert("Please fill out all boxes");
    }
    
  }

  async changedImage(){
    var imageInput = document.getElementById("imageInput") as HTMLInputElement;
   // var imageInput = ref;
    var imgPreview = document.getElementById("testImageDiv");

    // console.log("TEST");

    if(imageInput.files){

      //this.loadedImage = imageInput.files[0];
      //var test : Blob = new Blob(this.loadedImage);

      //console.log(test);
      //console.log(imageInput.files[0]);

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
        
        // A VERY SLOW AND ANNOYING OPTION
        //  var reader = new FileReader();
        //  var fileByteArray : any = [];
        //  var array : any;
        //  reader.readAsArrayBuffer(files);
        //  reader.onloadend = function (evt) {
        
        //     if (evt.target!.readyState == FileReader.DONE) {
        //           var arrayBuffer : ArrayBuffer = (evt.target!.result) as ArrayBuffer;
        //           if(arrayBuffer != null){
        //             array = new Uint8Array(arrayBuffer);
        //           }
    
        //       for (var i = 0; i < array.length; i++) {
        //           fileByteArray.push(array[i]);
        //           console.log(fileByteArray);
        //         }
        //     }
        //     console.log(fileByteArray);
        // }

        //console.log("Test");

        const byteFile = await this.getAsByteArray(file)

        console.log(byteFile);
        console.log(byteFile.length);

        this.loadedImage = byteFile;
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


  clearInputFile(f : any){
    if(f.value){
        try{
            f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        }catch(err){ }
        if(f.value){ //for IE5 ~ IE10
            var form = document.createElement('form'),
                parentNode = f.parentNode, ref = f.nextSibling;
            form.appendChild(f);
            form.reset();
            parentNode.insertBefore(f,ref);
        }
    }
}

}
