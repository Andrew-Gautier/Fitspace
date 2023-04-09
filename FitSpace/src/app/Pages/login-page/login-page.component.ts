import { Component } from '@angular/core';
import {getAuth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/Database/userData';
import { USER_MANAGER } from 'src/main';

//Needed to track current user
export var currentUserID: string | undefined;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  async login(){
   signOut(getAuth())

    // Get the current user
   let test = await signInWithEmailAndPassword (getAuth() , this.email, this.password).then(response => {
      console.log('Success!') 
      this.router.navigate(["/Home"], {relativeTo : this.route})
    })

    const user = getAuth().currentUser; // Get the current user NVM i changed this

    currentUserID = user?.uid;
    //console.log(user?.uid);
  }
  // Passing a function into the promise . Passing the promise the code to run. Lambda
  async signup(username: string, password: string){
    signOut(getAuth())
    createUserWithEmailAndPassword(getAuth() , username, password).then(response => {
       console.log('Signup Success!')
     });

   }

   email = "";
   password = "";


   constructor(private router : Router, private route: ActivatedRoute ){

   }
}
