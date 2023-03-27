import { Component } from '@angular/core';

import { UserManager } from 'src/app/Database/userManager';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  testCreateUser(){
    var testManager = new UserManager();

    //Test
    testManager.createData("");

  }
}
