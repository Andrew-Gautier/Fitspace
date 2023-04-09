import { Component, Input } from '@angular/core';
import { currentUserID } from 'src/app/Pages/login-page/login-page.component';
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
  }

  async loadUserData(){
    if(currentUserID != null ){
      var data = await USER_MANAGER.loadData(currentUserID);
      if(data != null && data != undefined){
        this.displayname = data.displayName;
      }
    }
  }
}
