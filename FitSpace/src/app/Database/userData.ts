//This is what a user object should contain

export class UserData {

  //This needs to correlate with firebase's auth service
  userID : string;

  //Whats displayed on the screen
  displayName : string | undefined | null;

  email : string;

  //True if they are verified trainer / have posting permissions
  trainerAccount : boolean;

  //Temporary information 
  location : string | undefined;
  affilate : string | undefined; //company affilated with?
  primaryService : string | undefined; //What type of fitness are they associated with (not crossfit)

  likedPosts : Array<string>; //Array of post ids

  //Create a UserData object, contains 
  constructor(id : string, name : string | undefined | null, trainerFlag : boolean = false, location : string = "", affilate : string = "", primaryService : string = "", email : string = "", likedPosts : Array<string> | undefined = undefined){
    
    this.userID = id;
    if(name != undefined){
      this.displayName = name;
    }
    this.trainerAccount = trainerFlag;
    this.location = location;
    this.affilate = affilate;
    this.primaryService = primaryService;

    if(likedPosts != undefined){
      this.likedPosts = likedPosts;
    } else {
      this.likedPosts = new Array<string>();
    }
    
    this.email = email;

  }

}
