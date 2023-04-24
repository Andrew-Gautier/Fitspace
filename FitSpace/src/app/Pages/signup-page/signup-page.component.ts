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
     var emailCheck = this.isValidEmail(this.email);
      if(emailCheck == false){
        alert("Please enter a valid email address");
        return;
      } else {
      let uid = await createUserWithEmailAndPassword(getAuth() , this.email, this.password).then( (credentials) => {
        console.log('Signup Success!');
        return credentials.user.uid;
      });
 
      if(uid != undefined){
        var newUser = new UserData(uid, this.email, false);
        //console.log(newUser);
        await USER_MANAGER.createData(newUser);
        alert("Successfully created an account. Please go back to login and sign in.");

      } else {
       console.log("Failed to create user");
       alert("Something went wrong with user creation")
      }
    }
  }


    email = "";
    password = "";
    confirmPassword = "";
    match : boolean = false;


    passwordConfirmation(){
      return this.match = this.password == this.confirmPassword
      
    }
    isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return emailRegex.test(email);
    }
    
    
}
