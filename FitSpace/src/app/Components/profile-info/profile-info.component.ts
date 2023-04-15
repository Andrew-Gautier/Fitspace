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

  constructor(){
    this.displayname = "";
    this.userID = "";
    this.authorized = false;
    this.permission = false;
    console.log(this.userID);
    this.loadUserData();
    //console.log("CREATED PROFILE INFO COMPONENT");
  }

  async loadUserData(){
    //const user = getAuth().currentUser;

    var currUser = await USER_MANAGER.loadData(sessionStorage.getItem("currentUserID")!);
    if (currUser.admin){
      this.authorized = true;
      this.permission = true;
    }
    
    // console.log(currUser.userID);
    // console.log(this.userID);
    if(currUser.userID == this.userID){
      this.permission = true;
    }

    //const userID = sessionStorage.getItem("currentUserID");
    //console.log(userID);
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
      //  this.trainerText = "";
      }
    } else {
     // this.trainerText = "";
    }

  }

  ngOnInit(): void {
    this.loadUserData();
  }

  promoteTrainer(){
    USER_MANAGER.updateTrainer(this.userID, true);
    location.reload();
  }

  demoteTrainer(){
    USER_MANAGER.updateTrainer(this.userID, false);
    location.reload();
  }
  promoteAdmin(){
    USER_MANAGER.updateAdmin(this.userID, true);
    location.reload();
  }
  demoteAdmin(){
    USER_MANAGER.updateAdmin(this.userID, false);
    location.reload();
  }

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
