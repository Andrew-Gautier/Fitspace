import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  
   
   signup(){
     signOut(getAuth())
      createUserWithEmailAndPassword(getAuth() , this.email, this.password).then(response => {
        console.log('Signup Success!')
      })
    }
    email = "";
    password = "";
    confirmPassword = "";
    match : boolean = false;
    passwordConfirmation(){
      return this.match = this.password == this.confirmPassword
      
    }
    
}
