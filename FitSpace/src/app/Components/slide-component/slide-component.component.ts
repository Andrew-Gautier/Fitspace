import { Component, Input, OnInit } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { STORAGE } from 'src/main';

/**
 * @author Zachary Spiggle
 * @date 3/27/23
 * 
 * Represents a slide component for displaying an image and text
 */

@Component({
  selector: 'app-slide-component',
  templateUrl: './slide-component.component.html',
  styleUrls: ['./slide-component.component.css']
})
export class SlideComponentComponent implements OnInit {

  /** The URL of the slide image. */
  @Input() imgURL : string;
  /** The text data for the slide. */
  @Input() textData : string;

  /** The downloaded image URL. */
  imageFromURL : string | null;

  /** Called after the component is initialized. */
  ngOnInit(): void {
    this.showImage();
  }

  /** Initializes default values. */
  constructor() { 
    this.imgURL = "";
    this.textData = ""
    this.imageFromURL = null;
  }
  
   /**
   * Downloads the image data and sets `imageFromURL`.
   */
  async showImage() {

    //Get the reference to the link in the Firebase Storage
    let imageReference = ref(STORAGE, this.imgURL);

    //Download the image
    try {
      const url = await getDownloadURL(imageReference);
      this.imageFromURL = url; 
    } catch (error) {
      console.error(`Error downloading image: ${error}`);
    }
  }

}


