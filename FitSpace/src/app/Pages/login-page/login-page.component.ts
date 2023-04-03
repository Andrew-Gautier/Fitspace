import { Component } from '@angular/core';
import {getAuth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  login(){
   signOut(getAuth())
    signInWithEmailAndPassword (getAuth() , this.email, this.password).then(response => {
      console.log('Success!') 
      this.router.navigate(["/Home"], {relativeTo : this.route})
    })
  }
  // Passing a function into the promise . Passing the promise the code to run. Lambda
  signup(username: string, password: string){
    signOut(getAuth())
     createUserWithEmailAndPassword(getAuth() , username, password).then(response => {
       console.log('Signup Success!')
     })
   }
   email = "";
   password = "";
   constructor(private router : Router, private route: ActivatedRoute ){

   }
}
