import { Component, Injectable, Input, OnInit } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { STORAGE } from 'src/main';


@Component({
  selector: 'app-slide-component',
  templateUrl: './slide-component.component.html',
  styleUrls: ['./slide-component.component.css']
})
export class SlideComponentComponent implements OnInit {

  //Slide data
  @Input() imgURL : string;
  @Input() textData : string;

  //Image data
  imageFromURL : string | null;

  //On initialization, get the image data
  ngOnInit(): void {
    this.showimage();
  }

  //Default values
  constructor() { 
    this.imgURL = "";
    this.textData = ""
    this.imageFromURL = null;
  }
  
  //Display the image (Download the image data to the local browser)
  async showimage() {

    //Get the reference to the link in the Firebase Storage
    let imageReference = ref(STORAGE, this.imgURL);

    //Download the image
    getDownloadURL(imageReference).then(url => { 
      this.imageFromURL = url; 
    });
  }

}
