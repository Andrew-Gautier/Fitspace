//This is what a post object should contain

export class CommentData {

  userID : string;
  username : string;
  textData : string;

  //Create a UserData object, contains 
  constructor(userID : string, textData : string, username : string){
    this.userID = userID;
    this.textData = textData;
    this.username = username;
  }

}