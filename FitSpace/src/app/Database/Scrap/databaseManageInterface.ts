//Data refers to either post data type or user data type
// export interface Data{
//   info : string | undefined; //Information, may need to be expanded
//   link : string | undefined; //link to JSON firebase
// }

// Object takes the place of data interface

export interface DatabaseManager {

  //A max count that prevents all posts from being loaded from firebase at once
  max_count : number;

  //func loadDatas, takes a list of filterArgments (list of strings) and returns a list of data (user data / posts)
  loadDatas:(filterArgs : string[]) => Object[];

  //func loadData 
  //Load a singular piece from firebase (like a user)
  loadData:(dataID : string) => Object;

  //func createData( listOfDataParameters, userID):
  //Creates a new post and uploads it to firebase, returns true if succeeded, false otherwise
  createData:( newDataInfo : Object) => boolean;

  //func updatePost( postID, listOfPostChanges):
  //updates the data that has dataID with the newDataInfo
  updateData:( dataID : string, newDataInfo : Object) => boolean;// returns true if succeeded, false otherwise

  //func deleteData
  //remove the data that has dataID from the firebase
  removeData:( dataID : string) =>  boolean;

}