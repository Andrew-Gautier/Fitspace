

export class SlideData {

  imgURL : string; //Changed to BLOB at some point
  textData : string;

  //Create a UserData object, contains 
  constructor(imgLink : string, textData : string){
    this.imgURL = imgLink;
    this.textData = textData;
  }

}