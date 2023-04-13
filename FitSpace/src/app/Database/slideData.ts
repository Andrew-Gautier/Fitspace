

export class SlideData {

  imgURL : string; 
  textData : string;

  //Create a UserData object, contains a link to an image and text information
  constructor(imgLink : string, textData : string){
    this.imgURL = imgLink;
    this.textData = textData;
  }

}