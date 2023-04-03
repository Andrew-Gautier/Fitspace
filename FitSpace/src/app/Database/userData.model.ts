export interface UserDataModel{
  userID : number;

  //Whats displayed on the screen
  displayName : string;

  //True if they are verified trainer / have posting permissions
  trainerAccount : boolean;

  //Temporary information 
  location : string | undefined;
  affilate : string | undefined; //company affilated with?
  primaryService : string | undefined;
}