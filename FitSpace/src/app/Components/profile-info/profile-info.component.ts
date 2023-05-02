/**
 * @author Zachary Spiggle, Ian Rudy, Andrew Gautier
 * @date 4/05/23
 * 
 * This object displays the profile data and allows users to update what is shown to other users
 */
import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { USER_MANAGER } from 'src/main';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit{
  
  authorized : boolean;
  permission : boolean;

  @Input() userID : string;

  @Input() displayname : string | null | undefined;
  @Input() trainerText : string | undefined;
  @Input() location : string | undefined;
  @Input() email : string | undefined;
  @Input() affliate : string | undefined;
  @Input() userType : string | undefined;
  @Input() primaryService : string | undefined;
  admin : string | undefined;

  bio : string | undefined;

  /**
   * Constructor to initialize default values 
   */
  constructor(){
    this.displayname = "";
    this.userID = "";
    this.authorized = false;
    this.permission = false;
    console.log(this.userID);
    this.loadUserData();
  }

  /**
   * Asynchronous method to load the users page into the profile
   */
  async loadUserData(){

    var currUser = await USER_MANAGER.loadData(sessionStorage.getItem("currentUserID")!);
    if (currUser.admin){
      this.authorized = true;
      this.permission = true;
    }
    
    if(currUser.userID == this.userID){
      this.permission = true;
    }

    if(this.userID != null){
      var data = await USER_MANAGER.loadData(this.userID);
      if(data != null && data != undefined){
        this.displayname = data.displayName;
        this.location = data.location;
        this.affliate = data.affilate;
        this.bio = data.bio;
        this.email = data.email;
        this.primaryService = data.primaryService;
        if(data.admin == true){
          this.admin = "ADMIN";
        } else if(data.trainerAccount == true){
          this.trainerText = "Trainer";
        }
          this.bio = data.bio;
      }else {
      }
    } else {
    }

  }

  /**
   * When the object is created, loads the user's data
   */
  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Updates the user's status to be considered a trainer
   */
  promoteTrainer(){
    USER_MANAGER.updateTrainer(this.userID, true);
    location.reload();
  }

  /**
   *  Updates the user's status to no longer be considered a trainer
   */
  demoteTrainer(){
    USER_MANAGER.updateTrainer(this.userID, false);
    location.reload();
  }

  /**
   * Updates the user's permissions to contain admin priviledges 
   */
  promoteAdmin(){
    USER_MANAGER.updateAdmin(this.userID, true);
    location.reload();
  }

  /**
   * Updates the user's permissions to not contain admin priviledges 
   */
  demoteAdmin(){
    USER_MANAGER.updateAdmin(this.userID, false);
    location.reload();
  }

  /**
   * Prompts the user to input a new name and updates the user's display name to new input
   */
  editDisplayName(){
    let newname = prompt("Enter the name you would like to be changed to.", this.displayname!);
    
    if(newname){
      if(newname.length > 30){
        newname = newname.slice(0,30);
      }
      USER_MANAGER.updateDisplayname(this.userID, newname);
      location.reload();
    }
  }

  /**
   * Prompts the user to input a new email and updates the user's email to new input
   */
  editEmail(){
    let newname = prompt("Enter your email", this.email!);
    
    if(newname){
      if(newname.length > 30){
        newname = newname.slice(0,30);
      }
      USER_MANAGER.updateEmail(this.userID, newname);
      location.reload();
    }

  }

  /**
   * Prompts the user to input a new affliate and updates the user's affliate to new input
   */
  editAffliate(){
    let newname = prompt("Enter the name of your affliated company", this.affliate!);
    
    if(newname){
      if(newname.length > 50){
        newname = newname.slice(0,50);
      }
      USER_MANAGER.updateAffliate(this.userID, newname);
      location.reload();
    }

  }

  /**
   * Prompts the user to input a new location and updates the user's location to new input
   */
  editLocation(){
    let newname = prompt("Enter your general location.", this.location!);
    
    if(newname){
      if(newname.length > 50){
        newname = newname.slice(0,50);
      }
      USER_MANAGER.updateLocation(this.userID, newname);
      location.reload();
    }

  }

  /**
   * Prompts the user to input a new service and updates the user's service to new input
   */
  editService(){
    let newname = prompt("Enter your primary area of expertise", this.primaryService!);
    
    if(newname){
      if(newname.length > 50){
        newname = newname.slice(0,50);
      }
      USER_MANAGER.updateService(this.userID, newname);
      location.reload();
    }

  }

  /**
   * Prompts the user to input a new bio and updates the user's bio to new input
   */
  editBio(){
    let newbio = prompt("Enter your bio.");
    
    if(newbio){
      if(newbio.length > 140){
        newbio = newbio.slice(0,50);
      }
      USER_MANAGER.updateBio(this.userID, newbio);
      location.reload();
    }

  }
}
