//This is what a post object should contain

export class PostData {

  //This needs to correlate with firebase's auth service
  postID : string;

  //User information
  userID : string
  username : string;

  //Whats displayed on the screen
  postTitle : string;




  //Create a UserData object, contains 
  constructor(id : string, userID: string, username : string, postTitle : string){
    
    this.postID = id;
    this.userID = userID;
    this.username = username;

    this.postTitle = postTitle;


  }

}
