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
    let currentUser = sessionStorage.getItem("currentUserID");
    
    if(currentUser){
      this.userID = currentUser;
    } else {
      this.userID = "";
    }
  }

  viewUser(userID : string){
    this.router.navigate(['user', this.userID]);
  }
}
