import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  userID : string;

  constructor(private router: Router){
    //Setup the current user's ID
    let currentUser = sessionStorage.getItem("currentUserID");
    
    if(currentUser){
      this.userID = currentUser;
    } else {
      this.userID = "";
    }
  }

  //Navigate to the user's page
  viewUser(userID : string){
    this.router.navigate(['user', this.userID]);
  }
}
