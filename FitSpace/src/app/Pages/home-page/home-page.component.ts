import { Component } from '@angular/core';
import { UserData } from 'src/app/Database/userData';

//import { UserManager } from 'src/app/Database/userManager';
import { USER_MANAGER } from 'src/main';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  testCreateUser(){
    var testData = new UserData("1234", "TEST-USER", true);
    USER_MANAGER.createData(testData);
  }

  testUpdateUser(){ 
    var testData = new UserData("1234", "TEST-USER-UPDATED", false);
    USER_MANAGER.updateData(testData);
  }

  testRemoveUser(){  
    //var testData = new UserData(1234, "TEST-USER-UPDATED", false);
    USER_MANAGER.removeData("1234");
  }

  testLoadUser(){  
    //var testData = new UserData(1234, "TEST-USER-UPDATED", false);
    var data = USER_MANAGER.loadData("1234");

    console.log(data);

    console.log("Test name is : " + data.displayName);
  }
}
