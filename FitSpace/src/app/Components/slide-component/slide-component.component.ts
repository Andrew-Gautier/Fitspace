import { Component, Injectable, Input, OnInit } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { STORAGE } from 'src/main';


@Component({
  selector: 'app-slide-component',
  templateUrl: './slide-component.component.html',
  styleUrls: ['./slide-component.component.css']
})
export class SlideComponentComponent implements OnInit {

  @Input() imgURL : string;
  @Input() textData : string;

  imageFromURL : string | null;

  ngOnInit(): void {
    this.showimage();
  }

  constructor() { 
    this.imgURL = "";
    this.textData = ""
    this.imageFromURL = null;

    //this.showimage();
  }
  

  async showimage() {

    //173427789dIZrUQFqffVfs6z0BQLJsl3NpB3.png
    let imageReference = ref(STORAGE, this.imgURL);

    //imageReference = ref(STORAGE, "images/173427789dIZrUQFqffVfs6z0BQLJsl3NpB3.png");

    //console.log(imageReference);
    getDownloadURL(imageReference).then(url => { 
      this.imageFromURL = url; 
    });

  }

}
