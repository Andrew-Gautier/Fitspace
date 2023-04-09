

export class SlideData {

  imgData : string; //Changed to BLOB at some point
  textData : string;

  //Create a UserData object, contains 
  constructor(img : string, textData : string){
    this.imgData = img;
    this.textData = textData;
  }

}