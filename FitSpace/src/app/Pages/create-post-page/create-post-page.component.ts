import { Component } from '@angular/core';
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

  //Max number of slides a post may contain (Not a magic number)
  maxSlides = 10;

  megabyteSize = 1048576;
  maxImageSize = 20; //In megabytes (get multiplied by number above)
    //Instagrams maximum is 30mb

  //Array of [byte file, textdata]
  loadedSlides: Array<any>;

  //Preview data
  previewTitle: string;
  previewUsername: string | null;
  previewUserID: string | null;
  //Array of [File as URL, textdata]
  previewSlides: Array<any>;

  //Default values
  constructor() {
    this.previewTitle = "Preview";
    this.previewUsername = sessionStorage.getItem("currentUsername");;
    this.previewUserID = sessionStorage.getItem("currentUserID");;
    this.loadedSlides = new Array<any>();
    this.previewSlides = new Array<any>();
  }

  //Runs when create post is pressed
  async postWorkout() {

    let date = new Date();

    //This entire thing sets the postID to the UserID plus the hash of the current time stamp
    const userID = sessionStorage.getItem("currentUserID");
    var data = null;
    if (userID != null) {
      data = await USER_MANAGER.loadData(userID);
    }

    //Create a post ID by hashing the current time and adding the USERID
    let postID = hashFunction(date.getTime().toString()).toString();
    if (data?.userID != undefined) {
      postID = postID + data?.userID;
    }
    //Excessive I know, probably could have just used the current time with the USER ID



    var postTitleInput = ((document.getElementById("titleInput") as HTMLInputElement).value);

    //Check for null values
    if (postTitleInput != "" && this.loadedSlides.length > 0) {

      let newPost;
      let slides = new Array<SlideData>();

      //Convert slides into proper slides (URLs) (Use loadedSlides instead of preview slides)
      //Create slides for every loaded slide 
      for (let i = 0; i < this.loadedSlides.length; i++) {
        let slide = this.loadedSlides[i];

        //Create a path
        const newImagePath = 'images/' + postID + i + ".png"
        const newImageRef = ref(STORAGE, newImagePath);

        //Store file at created path
        uploadBytes(newImageRef, slide[0]).then((snapshot) => {
          console.log('Uploaded a blob or file!' + i);
        });

        //Create slide data using the path (URL), and the text data stored in the small array
        var newSlide = new SlideData(newImagePath, slide[1]);
        //Send to realtime database
        slides.push(newSlide)
      }

      //Create new postdata
      if (userID != null && data?.displayName != null) {
        newPost = new PostData(postID, userID, data?.displayName, postTitleInput, slides);
      }

      //Upload post to database
      if (newPost != undefined) {
        POST_MANAGER.createData(newPost);
        console.log("Uploaded Post");
      }

      //Clears everything properly
      this.cancelPost();

    } else { //Null requirements not met
      alert("Please fill out all boxes");
    }

  }

  //Update the preview information
  async updatePreview() {

    //Update title
    if (((document.getElementById("titleInput") as HTMLInputElement).value) != "") {
      this.previewTitle = ((document.getElementById("titleInput") as HTMLInputElement).value);
    }

    //Update slides 
    //Needs to be handled differently
    for (let i = 0; i < this.previewSlides.length; i++) {
      let currentSlide = this.previewSlides[i];
    }
  }

  //Create a new slide and save it until we upload
  async createSlide() {

    //Checks if we are under the max count of slides
    if (this.loadedSlides.length < this.maxSlides) {

      //Image aspect of slide
      var imageInput = document.getElementById("imageInput") as HTMLInputElement;
      var textInput = (document.getElementById("textInput") as HTMLInputElement).value

      //Create temporary slide data
      if (imageInput.files) {
        const fileReader = new FileReader();

        //get file input
        var file = imageInput.files[0];

        if(file.size > this.maxImageSize * this.megabyteSize){
          alert("Image is too big!");
          return;
        }


        fileReader.readAsDataURL(file);

        //When the file loads, load it to the preview slides
        fileReader.addEventListener("load", () => {
          this.previewSlides.push([fileReader.result, textInput]);
        });


        //Create byte array and upload it with the text data to the loadedSlides
        const byteFile = await this.getAsByteArray(file)       
        this.loadedSlides.push([byteFile, textInput]);
      }
      //Clear Description and file image
      this.clearDescriptionAndImageFile();

      //Update the preview
      this.updatePreview();

    } else { //At maximum # of slides
      alert("You are at the maximum amount of slides!");
    }

  }

  //Clear the input boxes for slides
  clearDescriptionAndImageFile(){
    //clearing boxes
    (document.getElementById('textInput') as HTMLTextAreaElement).value = '';
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.value = '';
    fileInput.dispatchEvent(new Event('input', { bubbles: true })); // added this to trigger input event in some browsers
    (document.getElementById("textInput") as HTMLInputElement).value = '';
    this.clearImagePreview();
  }

  //Remove the most recently added slide
  deleteSlide() {
    this.previewSlides.pop();
    this.loadedSlides.pop();
    //Update the slide preview
    this.clearDescriptionAndImageFile(); //Im not sure if this is needed
    this.updatePreview();
    this.clearImagePreview();
  }

  //Cancel the post and clear all fields
  cancelPost() {
    //Cleanup
    (document.getElementById("titleInput") as HTMLInputElement).value = ''; //deletes title box
    this.clearDescriptionAndImageFile();
    this.clearImagePreview();
    //Reset vars
    this.previewTitle = "Preview";
    this.previewUsername = sessionStorage.getItem("currentUsername");;
    this.previewUserID = sessionStorage.getItem("currentUserID");;
    this.loadedSlides = new Array<any>();
    this.previewSlides = new Array<any>();
  }

  // IMAGE FUNCTIONS --------------------------------------

  //When the image detects a change
  async changedImage() {
    //Get image input
    var imageInput = document.getElementById("imageInput") as HTMLInputElement;
    var imgPreview = document.getElementById("testImageDiv");

    //Display it to preview
    if (imageInput.files) {
      if (imgPreview != null) {
        const fileReader = new FileReader();
        var file = imageInput.files[0];
        fileReader.readAsDataURL(file);

        fileReader.addEventListener("load", function () {
          if (imgPreview != null) {
            imgPreview.style.display = "block";
            imgPreview.innerHTML = '<img src="' + this.result + '" style="max-width:25vw" />';//'"style="width:20%; height:20vh;" />';
          }
        });
      }
    }
  }

  clearImagePreview(){
    var imgPreview = document.getElementById("testImageDiv");
    if (imgPreview != null) {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src=\"\"style="" />'; //width:20vw; height:20vh;
    }
  }

  //Helper functions 
  //Source: https://dilshankelsen.com/convert-file-to-byte-array/
  //Best solution I've found

  //return a byte array of current file (used to upload to storage)
  async getAsByteArray(file: any): Promise<any> {
    return new Uint8Array(await this.readFile(file))
  }

  async readFile(file: any): Promise<ArrayBufferLike> {
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

}
