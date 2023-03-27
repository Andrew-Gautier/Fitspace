import { Component, OnInit } from "@angular/core";
import { DatabaseManager } from "./databaseManageInterface";
//import { Data } from "./databaseManageInterface";

//implements Data
export class PostData {
  info: string | undefined;
  link: string | undefined;
}


@Component({
  template: ''
})
export class PostManager implements DatabaseManager, OnInit {


  //A max count that prevents all posts from being loaded from firebase at once
  max_count = 10;


  //func loadDatas, takes a list of filterArgments (list of strings) and returns a list of data (user data / posts)
  loadDatas(filterArgs : string[]) : Object[] {

    //Explicitly declare the list
    var dataList: Object[] = [];

    //Load posts to list here

    return dataList;
  }

  
  //func loadData 
  //Load a singular piece from firebase (like a user)
//  (dataID : string) : data;
  loadData(dataID : string) : Object {

    //Explicitly declare the list
    var data: Object = Object;

    //Use DataID to get post

    return data;
  }

  //func createData( listOfDataParameters, userID):
  //Creates a new post and uploads it to firebase
  createData(newDataInfo : Object) : boolean { //Returns true if was a success, false otherwise

    //Explicitly declare the list
    var data: Object = Object;

    //Use DataID to get post

    return true;
  }
 
  //func updatePost( postID, listOfPostChanges):
  //updates the data that has dataID with the newDataInfo
//  ( dataID : string, newDataInfo : data) : void
  updateData(dataID: string, newDataInfo : Object) : boolean { //Returns true if was a success, false otherwise

    //Explicitly declare the list
    var data: Object = Object;

    //Use DataID to get post, and update it

    return true;
  }

  //func deleteData
  //remove the data that has dataID from the firebase
  removeData(dataID: string) : boolean { //Returns true if was a success, false otherwise

    var data: Object = Object;

    //Use DataID to get post, and remove it

    return true;
  }

  ngOnInit(): void {
    //Not implemented yet
  }
}