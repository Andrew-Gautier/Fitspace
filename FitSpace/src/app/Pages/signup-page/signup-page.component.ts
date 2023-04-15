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
      let uid = await createUserWithEmailAndPassword(getAuth() , this.email, this.password).then( (credentials) => {
        console.log('Signup Success!');
        return credentials.user.uid;
      });
      
     // const user = credentials.user;//getAuth().currentUser;
 
      if(uid != undefined){
        var newUser = new UserData(uid, this.email, false);
        console.log(newUser);
        //setTimeout(() => {USER_MANAGER.createData(newUser)}, 100);
        await USER_MANAGER.createData(newUser);
        alert("Successfully created an account. Please go back to login and sign in.");
        //document.location.href = "";
        // alert("You have been registered, please continue to log in.");
        // setTimeout( () => {
        //   document.location.href = "";
        // }, 100);

      } else {
       console.log("Failed to create user");
       alert("Something went wrong with user creation")
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
