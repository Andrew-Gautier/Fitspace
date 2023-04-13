import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { USER_MANAGER } from 'src/main';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit{
  
  @Input() userID : string;

  @Input() displayname : string | null | undefined;
  @Input() trainerText : string | undefined;
  @Input() location : string | undefined;
  @Input() email : string | undefined;
  @Input() affliate : string | undefined;
  @Input() userType : string | undefined;
  @Input() primaryService : string | undefined;
  constructor(){
    this.displayname = "";
    this.userID = "";
    console.log(this.userID);
    this.loadUserData();
    //console.log("CREATED PROFILE INFO COMPONENT");
  }

  async loadUserData(){
    //const user = getAuth().currentUser;
    //sessionStorage.setItem("currentUserID", user?.uid)
    //const userID = sessionStorage.getItem("currentUserID");
    //console.log(userID);
    if(this.userID != null){
      var data = await USER_MANAGER.loadData(this.userID);
      if(data != null && data != undefined){
        this.displayname = data.displayName;
        this.location = data.location
        if(data.trainerAccount == true){
          this.trainerText = "Trainer";
        }
      }else {
      //  this.trainerText = "";
      }
    } else {
     // this.trainerText = "";
    }

  }

  ngOnInit(): void {
    console.log("SOMETHING ANYTHING PLEASe");
    console.log(this.userID);
    this.loadUserData();
  }

}
