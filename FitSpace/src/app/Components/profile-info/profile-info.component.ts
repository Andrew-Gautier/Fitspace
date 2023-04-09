import { Component, Input } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { USER_MANAGER } from 'src/main';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  
  @Input() displayname : string | null | undefined;

  constructor(){
    this.displayname = "";
    this.loadUserData();
    //console.log("CREATED PROFILE INFO COMPONENT");
  }

  async loadUserData(){
    //const user = getAuth().currentUser;
    //sessionStorage.setItem("currentUserID", user?.uid)
    const userID = sessionStorage.getItem("currentUserID");
    console.log(userID);
    if(userID != null){
      var data = await USER_MANAGER.loadData(userID);
      if(data != null && data != undefined){
        this.displayname = data.displayName;
      }
    }
  }
}
