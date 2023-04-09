import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserData } from 'src/app/Database/userData';
import { USER_MANAGER } from 'src/main';




@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  
   
   async signup(){
     signOut(getAuth())
      let test = await createUserWithEmailAndPassword(getAuth() , this.email, this.password).then(response => {
        console.log('Signup Success!');
      });
   
      const user = getAuth().currentUser;

      console.log(user);
      console.log("???");
 
      if(user != undefined){
       var newUser = new UserData(user.uid, user.email, false);
      
       USER_MANAGER.createData(newUser);
      } else {
       console.log("Failed to create user");
      }
    }
    email = "";
    password = "";
    confirmPassword = "";
    match : boolean = false;
    passwordConfirmation(){
      return this.match = this.password == this.confirmPassword
      
    }
    
}
